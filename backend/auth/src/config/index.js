import dotenv from "dotenv";
dotenv.config();

export default {
  mongoURI: process.env.MONGODB_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET || "some_super_secret_key_123",
  userEmail: process.env.USER_EMAIL, 
  password: process.env.PASSWORD,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
};
