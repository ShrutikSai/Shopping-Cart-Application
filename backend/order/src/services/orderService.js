import Order from "../models/order.js";
import amqp from "amqplib";

class OrderService {
  async createOrder(products, username, orderId, total) {
    const newOrder = new Order({
      products,
      user: username,
      totalPrice: total,
    });

    await newOrder.save();

    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("products");

    const { user, products: savedProducts, totalPrice } = newOrder.toJSON();
    channel.sendToQueue(
      "products",
      Buffer.from(JSON.stringify({ orderId, user, products: savedProducts, totalPrice }))
    );

    return { success: true, message: "Order created successfully" };
  }

  async getOrders() {
    return await Order.find();
  }

  async getOrderById(orderId) {
    return await Order.findById(orderId);
  }

  async getOrderByUserId(userId) {
    return await Order.find({ userId });
  }

  async deleteOrder(orderId) {
    return await Order.findByIdAndDelete(orderId);
  }

  async changeOrderStatus(orderId, status) {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  }

  async cancelOrder(orderId, userId) {
    return await Order.findOneAndUpdate(
      { _id: orderId, userId },
      { status: "canceled" },
      { new: true }
    );
  }
}

export default OrderService;
