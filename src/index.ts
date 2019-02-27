import express from 'express'
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

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { stream }))
app.use('/api', routes)

/** 404 */
app.use((_, res) => {
  res.status(404).json({ error: 'Route does not exist' })
})

app.listen(PORT, () => {
  logger.info(`App up on ${PORT}`)
})
