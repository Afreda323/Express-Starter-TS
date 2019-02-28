import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import logger from '../logger'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = new User({ email, password })

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next({ message: 'Email Address is Taken', error: true })
    }
    const savedUser = await user.save()
    res.json({ id: savedUser._id, email: savedUser.email })
  } catch (e) {
    logger.error(e)
    return next(e)
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next({ message: 'User does not exist', error: true })
    }

    const isCorrectEmail = await user.comparePassword(password)
    if (!isCorrectEmail) {
      return next({ message: 'Incorrect Password', error: true })
    }

    return res.json({ id: user._id, email: user.email })
  } catch (e) {
    console.error(e)
    return next(e)
  }
}

export default {
  createUser,
  loginUser,
}
