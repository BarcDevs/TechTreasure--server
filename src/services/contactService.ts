import ContactFormModel from '../db/contactFormModel'
import Subscriber from '../db/subscriberModel'


export const createContactForm = async (formData: any) =>
  ContactFormModel
  .create(formData)

export const addSubscriber = async (formData: any) =>
  Subscriber.create(formData)
