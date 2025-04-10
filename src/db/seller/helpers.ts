export const TrendSchema = {
  change: { type: Number, required: true },
  trend: { type: String, enum: ['up', 'down'], required: true }
}
