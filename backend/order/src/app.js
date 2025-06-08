import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import amqp from "amqplib";
import Order from './models/order.js';
import errorHandler from './middlewares/errorHandler.js';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from "dotenv";
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setupOrderConsumer();
    this.setMiddlewares();
    this.setRoutes();
  }

  async connectDB() {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:3030'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));
    this.app.use(errorHandler);
  }

  async setRoutes() {
    this.app.use("/", orderRoutes);
  }

  async setupOrderConsumer() {
    console.log("Connecting to RabbitMQ...");

    setTimeout(async () => {
      try {
        const amqpServer = process.env.RABBITMQ_URI;
        const connection = await amqp.connect(amqpServer);
        console.log("Connected to RabbitMQ");

        const channel = await connection.createChannel();
        await channel.assertQueue("orders");

        channel.consume("orders", async (data) => {
          try {
            console.log("Consuming ORDER service");
            const { products, quantities, userId, orderId, total } = JSON.parse(data.content);

            if (!Array.isArray(products) || !Array.isArray(quantities) || products.length !== quantities.length) {
              console.error("Invalid data: products and quantities must be arrays of the same length.");
              channel.nack(data);
              return;
            }

            const newOrder = new Order({
              products,
              quantities,
              userId,
              totalPrice: total,
            });

            await newOrder.save();

            channel.ack(data);
            console.log("Order saved to DB and ACK sent to ORDER queue");

            const { userId: savedUser, products: savedProducts, quantities: savedQuantities, totalPrice } = newOrder.toJSON();

            channel.sendToQueue(
              "products",
              Buffer.from(JSON.stringify({
                orderId,
                userId: savedUser,
                products: savedProducts,
                quantities: savedQuantities,
                totalPrice,
              }))
            );
          } catch (err) {
            console.error("Error processing order:", err.message);
            channel.nack(data);
          }
        });
      } catch (err) {
        console.error("Failed to connect to RabbitMQ:", err.message);
      }
    }, 10000);
  }

  start() {
    this.server = this.app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  }

  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}

export default App;
