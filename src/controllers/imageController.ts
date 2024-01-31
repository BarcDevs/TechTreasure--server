import { NextFunction, Request, Response } from 'express'
import sharp from 'sharp'
import * as fs from 'fs'

const imageLocation = 'public/images/products'

export const saveImages = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files)
    return next()

  if (!(req.files instanceof Array)) return next()

  await Promise.all(
    req.files.map(async (file) => {
      if (fs.existsSync(`${imageLocation}/${file.fieldname}`))
        return

      await sharp(file.buffer)
        .resize({ width: 500, height: 600, fit: 'contain' })
        .toFormat('jpeg')
        .toFile(`${imageLocation}/${file.fieldname}`)
    })
  )
  next()
}
