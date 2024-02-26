export default {
  port: process.env.PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  origin: process.env.URL || 'http://localhost:3000',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
}
