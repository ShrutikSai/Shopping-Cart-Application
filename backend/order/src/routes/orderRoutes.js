import express from "express";
import OrderController from "../controllers/orderController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
const orderController = new OrderController();
router.get("/user", isAuthenticated, (req, res, next) =>
  orderController.getOrderByUserId(req, res, next)
);
router.get("/", (req, res, next) => orderController.getOrders(req, res, next));
router.get("/:id", (req, res, next) =>
  orderController.getOrderById(req, res, next)
);
router.post("/", (req, res, next) =>
  orderController.createOrder(req, res, next)
);
router.patch("/:id", (req, res, next) =>
  orderController.changeOrderStatus(req, res, next)
);
router.patch("/:id/cancel", isAuthenticated, (req, res, next) =>
  orderController.cancelOrder(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  orderController.deleteOrder(req, res, next)
);
export default router;
