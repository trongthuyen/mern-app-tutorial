import express from 'express'
import { AuthController } from '../app/controllers/index.js'
import verifyToken from '../middlewares/auth.js'

const router = express.Router()

router.get('/', verifyToken, AuthController.checkLoggedin)

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// router.post('/resetPassword',AuthController.resetPassword)
// router.post('/forgotPassword',AuthController.forgotPassword)

export default router
