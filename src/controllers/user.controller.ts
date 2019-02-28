import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import logger from '../logger'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = new User({ email, password })

  try {
    const savedUser = await user.save()
    res.json({ id: savedUser._id, email: savedUser.email })
  } catch (e) {
    logger.error(e)
    return next(e)
  }
}

export default {
  createUser,
}
