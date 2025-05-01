import { Request, Response } from 'express'
import { successResponse } from '../services/responseFactory'
import { catchAsync } from './errorController'
import { createContactForm } from '../services/contactService'

export const saveContactForm = catchAsync(async (req: Request, res: Response) => {
  await createContactForm(req.body)

  successResponse(res, {
    status: 'success',
    message: 'Message sent successfully'
  })
})
