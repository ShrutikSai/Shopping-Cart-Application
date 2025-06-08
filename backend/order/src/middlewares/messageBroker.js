import amqp from "amqplib";
import OrderService from "../services/orderService.js";
import dotenv from "dotenv";
dotenv.config();

class MessageBroker {
  static async connect() {
    try {
      const connection = await amqp.connect(process.env.rabbitMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.rabbitMQ_URI, { durable: true });
      channel.consume(process.env.rabbitMQ_URI, async (message) => {
        try {
          const order = JSON.parse(message.content.toString());
          const orderService = new OrderService();
          await orderService.createOrder(order);
          channel.ack(message);
        } catch (error) {
          console.error(error);
          channel.reject(message, false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
export default MessageBroker;
