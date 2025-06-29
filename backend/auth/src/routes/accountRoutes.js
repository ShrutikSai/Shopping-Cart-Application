import express from 'express'

const router = express.Router()

import AuthController from '../controllers/authController.js';
const authController = new AuthController()

import authMiddleware from '../middlewares/authMiddleware.js';

router.get("/profile", authMiddleware, (req, res, next) => authController.getUserProfile(req, res, next));
router.put("/profile", authMiddleware, (req, res, next) => authController.updateUserProfile(req, res, next));
router.get("/profile/address", authMiddleware, (req, res, next) => authController.getUserAddresses(req, res, next));
router.get("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.getUserAddress(req, res, next));
router.post("/profile/address", authMiddleware, (req, res, next) => authController.addAddress(req, res, next));
router.put("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.updateAddress(req, res, next));
router.delete("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.deleteAddress(req, res, next));


export default router;