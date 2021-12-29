import dbConnect from '../../lib/dbConnect'
import Anylytics from '../../models/analytics'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const data = await Anylytics.create(
          typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        )

        res.status(201).json({ success: true, data })
      } catch (error) {
        console.dir(error)
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
