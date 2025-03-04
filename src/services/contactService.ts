import ContactFormModel from '../db/contactFormModel'


export const createContactForm = async (formData: any) => ContactFormModel
  .create(formData)
