import dbConnect from '../../../lib/dbConnect'
import Events from '../../../models/events'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const start = req.query.start
        ? new Date(req.query.start as string)
        : new Date(new Date().setHours(0, 0, 0, 0))
      const end = req.query.end
        ? new Date(req.query.end as string)
        : new Date(start.setHours(23, 59, 59, 99))

      const events = await Events.find({
        date: {
          $gte: start.toISOString(),
          $lte: end.toISOString(),
        },
      })
        .sort({ date: 1 })
        .lean()

      res.status(200).json({ data: events })
      break
    case 'POST':
      try {
        const data = await Events.create(req.body)

        res.status(201).json({ data })
      } catch (error) {
        console.dir(error)
        res.status(400).json({ error })
      }
      break
    default:
      res.status(405).json({ error: { message: 'Method Not Implemented ' } })
      break
  }
}
