import { Request, Response } from 'express'

const getExample = (req: Request, res: Response) => {
  return res.json({
    hello: 'world',
  })
}

export default {
  getExample,
}
