import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_URI: process.env.MONGODB_ORDER_URI,
    RABBITMQ_URI: process.env.RABBITMQ_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    port: 3002
};
  