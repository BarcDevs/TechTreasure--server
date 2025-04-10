import mongoose from 'mongoose'

const PeriodSchema = new mongoose.Schema({
  value: Number,
  change: Number,
  trend: { type: String, enum: ['up', 'down'] }
}, { _id: false })

const OrdersDataSchema = new mongoose.Schema({
  total: Number,
  completed: Number,
  pending: Number,
  canceled: Number,
  change: Number,
  trend: { type: String, enum: ['up', 'down'] }
}, { _id: false })

const CustomersDataSchema = new mongoose.Schema({
  total: Number,
  new: {
    daily: Number,
    weekly: Number,
    monthly: Number
  },
  growth: Number,
  trend: { type: String, enum: ['up', 'down'] }
}, { _id: false })

const RevenueSchema = new mongoose.Schema({
  total: Number,
  profits: Number,
  taxes: Number,
  fees: Number,
  refunds: Number
}, { _id: false })

const ProductPerformanceSchema = new mongoose.Schema({
  name: String,
  sales: Number,
  revenue: Number
}, { _id: false })

const LowStockSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  threshold: Number
}, { _id: false })

const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  reviews: Number
}, { _id: false })

const CustomerRetentionSchema = new mongoose.Schema({
  new: Number,
  returning: Number
}, { _id: false })

const AverageOrderValueSchema = new mongoose.Schema({
  current: Number,
  previous: Number,
  change: Number,
  trend: { type: String, enum: ['up', 'down'] }
}, { _id: false })

const PeakHourSchema = new mongoose.Schema({
  hour: String,
  orders: Number
}, { _id: false })

const TrafficSourceSchema = new mongoose.Schema({
  source: String,
  percentage: Number,
  change: Number,
  trend: { type: String, enum: ['up', 'down'] }
}, { _id: false })

const CampaignSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['email', 'sms'] },
  sent: Number,
  opened: Number,
  clicked: Number,
  converted: Number
}, { _id: false })

const PromotionSchema = new mongoose.Schema({
  name: String,
  discount: String,
  orders: Number,
  revenue: Number,
  averageOrder: Number
}, { _id: false })

const AnalyticsSchema = new mongoose.Schema({
  sales: {
    today: PeriodSchema,
    week: PeriodSchema,
    month: PeriodSchema
  },

  orders: OrdersDataSchema,

  customers: CustomersDataSchema,

  revenue: RevenueSchema,

  bestSellingProducts: [ProductPerformanceSchema],

  lowStockItems: [LowStockSchema],

  productReviews: [ReviewSchema],

  customerRetention: CustomerRetentionSchema,

  averageOrderValue: AverageOrderValueSchema,

  peakHours: [PeakHourSchema],

  trafficSources: [TrafficSourceSchema],

  campaignPerformance: [CampaignSchema],

  promotionsImpact: [PromotionSchema]
}, { timestamps: true })

export default mongoose.model('seller.Analytics', AnalyticsSchema, 'seller.analytics')
