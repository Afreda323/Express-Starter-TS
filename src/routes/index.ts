import { Router, Response } from 'express'
import userRoutes from './user.routes'
const router = Router()

router.get('/healthCheck', (req: any, res: Response) =>
  res.status(200).send('All Good'),
)
router.use('/user', userRoutes)

export default router
