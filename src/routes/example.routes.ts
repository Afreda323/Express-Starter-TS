import { Router } from 'express'
import exampleController from '../controllers/example.controller'
const router = Router()

router.get('/', exampleController.getExample)

export default router
