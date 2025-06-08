import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import errorHandler from "./middlewares/index.js";
import AuthRoute from "./routes/authRoutes.js";
import UserRoute from "./routes/userRoutes.js";
import AccountRoute from "./routes/accountRoutes.js";
import googleAuth from "./routes/googleAuthRoutes.js";
import adminGoogleAuth from "./routes/adminGoogleAuth.js";
import passport from "passport";
import "./passport.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
  }
  async connectDB() {
    try {
      await mongoose.connect(
      process.env.MONGODB_URI ,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
    }
  }
  async disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(passport.initialize());
    this.app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:3030"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    this.app.use(errorHandler);
  }
  setRoutes() {
    this.app.use("/auth", AuthRoute);
    this.app.use("/auth/google", googleAuth);
    this.app.use("/auth/admin/google", adminGoogleAuth);
    this.app.use("/user", UserRoute);
    this.app.use("/account", AccountRoute);
    this.app.get("/", (req, res) =>
      res.json({ message: "Welcome to dashboard" })
    );
  }
  start() {
    const PORT = process.env.PORT || 3000;
    this.server = this.app.listen(PORT, () =>
      console.log(`🚀 Server started on http://localhost:${PORT}`)
    );
  }
  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}
export default App;
