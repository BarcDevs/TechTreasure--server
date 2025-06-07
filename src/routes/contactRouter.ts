import express from 'express'
import { saveContactForm, subscribe } from '../controllers/contactController'
import { contactFormValidationRules } from '../validations/contactFormValidation'
import { validate } from '../validations'
import { subscribeValidationRules } from '../validations/subscribeValidation'

const router = express.Router()

router
  .post('/', contactFormValidationRules(), validate, saveContactForm)
  .post('/subscribe', subscribeValidationRules(), validate, subscribe)

export default router
