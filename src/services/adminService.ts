import Order from '../db/orderModel'
import Customer from '../db/admin/CustomerSchema'
import Analytics from '../db/admin/AnalyticsSchema'
import Inquiry from '../db/admin/inquiryModel'

const getCustomersList = async () =>
  Customer.find()

const getCustomerById = async (id: string) =>
  Customer.findById(id)

const getAllOrders = async () =>
  Order.find()

const getCustomerOrders = async (customerId: string) =>
  Order.find({ customer: customerId })

const getOrderById = async (id: string) =>
  Order.findById(id)

const getAnalyticsData = async () =>
  Analytics.find()

const getCustomerInquiries = async () =>
  Inquiry.find()

export const updateInquiryById = async (id: string, data: any) =>
  Inquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })

export {
  getCustomersList,
  getCustomerById,
  getAllOrders,
  getCustomerOrders,
  getOrderById,
  getAnalyticsData,
  getCustomerInquiries
}
