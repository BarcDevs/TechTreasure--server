import express from 'express'
import { saveContactForm } from '../controllers/contactController'
import { contactFormValidationRules } from '../validations/contactFormValidation'
import { validate } from '../validations'

const router = express.Router()

router.post('/', contactFormValidationRules(), validate, saveContactForm)

export default router
