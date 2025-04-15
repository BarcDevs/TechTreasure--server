import express from 'express'
import { login, signup } from '../controllers/authController'
import { userCreateInfoValidationRules } from '../validations/userValidation'
import { validate } from '../validations'

const router = express.Router()

router
  .post('/login', login)
  .post('/signup', userCreateInfoValidationRules(), validate, signup)

export default router
