import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import logger, { stream } from './logger'
import routes from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const { PORT } = process.env
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/test'

/** Mongo Connect */
mongoose.Promise = global.Promise
try {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
} catch (err) {
  logger.error('Failed to connect to MONGODB')
  logger.error(err)
}

/** Middleware */
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { stream }))

/** Router */
app.use('/api', routes)

/** Catch all errors */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).json(err)
  }

  return next()
})

/** 404 */
app.use((_, res: Response) => {
  res.status(404).json({ error: 'Route does not exist' })
})

app.listen(PORT || 8000, () => {
  logger.info(`App up on ${PORT || 8000}`)
})
