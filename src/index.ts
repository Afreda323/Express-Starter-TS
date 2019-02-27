import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import logger from './logger'
import { sequelize } from './db'
import routes from './routes'

const app = express()
const { PORT } = process.env

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`)
  })

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { stream: logger.stream }))
app.use('/api', routes)

app.listen(PORT, () => {
  logger.info(`App up on ${PORT}`)
})
