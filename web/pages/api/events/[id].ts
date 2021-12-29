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
    case 'PATCH':
      try {
        const data = await Events.findByIdAndUpdate(req.query.id, req.body, {
          upsert: true,
          new: true,
        })

        res.status(201).json({ data })
      } catch (error) {
        console.dir(error)
        res.status(400).json({ error })
      }
      break
    case 'DELETE':
      try {
        const data = await Events.findByIdAndDelete(req.query.id)

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
