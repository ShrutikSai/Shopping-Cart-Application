import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const proxy = httpProxy.createProxyServer();
const app = express();
app.use(morgan("dev"));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3030",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
];
const productURL = "http://products:3001";
const orderURL = "http://orders:3002";
const authURL = "http://auth:3000";
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/products", (req, res) => {
  proxy.web(req, res, { target: productURL });
});
app.use("/orders", (req, res) => {
  proxy.web(req, res, { target: orderURL });
});
app.use("/", (req, res) => {
  proxy.web(req, res, { target: authURL });
});
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
