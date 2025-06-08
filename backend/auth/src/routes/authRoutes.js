import express from 'express'

const router = express.Router()

import authMiddleware from '../middlewares/authMiddleware.js';
import validators from '../validators/auth.js';


const { loginValidator, signupValidator, emailValidator, verifyUserValidator, verifyForgotPassword, changePasswordValidator } = validators;
import validate from '../validators/validate.js';
import AuthController from '../controllers/authController.js';




const authController = new AuthController()
router.post("/signin", loginValidator, validate, (req, res, next) => authController.signIn(req, res, next));
router.post("/signup", signupValidator, validate, (req, res, next) => authController.signUp(req, res, next));
router.post("/send-email", emailValidator, validate, (req, res, next ) => authController.verifyEmail(req, res, next))
router.post("/verify-email", verifyUserValidator, validate, (req, res, next ) => authController.verifyUser(req, res, next))
router.post("/send-reset" , emailValidator, validate, (req, res, next) => authController.sendForgotPassword(req, res, next))
router.post("/verify-reset"  , verifyUserValidator, validate, (req, res ,next) => authController.verifyResetPassword(req, res ,next))
router.post("/reset-password", verifyForgotPassword, validate,  (req, res, next) => authController.resetPassword(req, res, next))
router.put("/change-password", changePasswordValidator, validate, authMiddleware, (req, res, next) => authController.changePassword(req, res, next))
router.post("/send-login-otp", emailValidator, validate, (req, res, next) => authController.sendLoginOTP(req, res, next))
router.post("/loginOTP", verifyUserValidator, validate, (req, res, next) => authController.loginOTP(req, res, next))
export default router;