import express from 'express'
import UserController from  '../controllers/userController.js';

const userController = new UserController()
const router = express.Router()

router.get('/', (req, res, next) => userController.getUsers(req, res, next))

router.get('/:id', (req, res, next) => userController.getUserById(req, res, next))

router.delete('/:userId', (req, res, next) => userController.deleteUser(req, res, next))

router.post('/', (req, res, next) => userController.createUser(req, res, next))


export default router;