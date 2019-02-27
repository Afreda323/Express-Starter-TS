import { Router, Response } from 'express'
import exampleRoutes from './example.routes'
const router = Router()

router.get('/healthCheck', (req: any, res: Response) =>
  res.status(200).send('All Good'),
)
router.use('/example', exampleRoutes)

export default router
