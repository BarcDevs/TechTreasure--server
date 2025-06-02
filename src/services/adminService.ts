import Customer from '../db/admin/CustomerSchema'
import Order from '../db/admin/OrderSchema'
import Analytics from '../db/admin/AnalyticsSchema'
import Item from '../db/itemModel'
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

const getStoreStats = async () => {
  const [products, customers, orders] = await Promise.all([
    Item.countDocuments(),
    Customer.countDocuments(),
    Order.countDocuments()
  ])


  return {
    products,
    customers,
    orders
  }
}

const getCustomerInquiries = async () =>
  Inquiry.find()

export {
  getCustomersList,
  getCustomerById,
  getAllOrders,
  getCustomerOrders,
  getOrderById,
  getAnalyticsData,
  getStoreStats,
  getCustomerInquiries
}
