import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/signup", registerUser)
userRouter.post("/login", loginUser)

export default userRouter