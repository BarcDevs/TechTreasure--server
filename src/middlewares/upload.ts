import multer from 'multer'
import AppError from '../utils/AppError'

const multerStorage = multer.memoryStorage()

const multerImageFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError(400, `${file.originalname} is not an image! Please upload images only.`), false)
  }
}

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerImageFilter
})

export { uploadImage }
