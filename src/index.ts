import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import logger, { stream } from './logger'
import routes from './routes'

const app = express()
const { PORT } = process.env

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { stream }))
app.use('/api', routes)

app.listen(PORT, () => {
  logger.info(`App up on ${PORT}`)
})
