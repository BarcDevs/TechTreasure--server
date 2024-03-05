module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  origin: process.env.ORIGIN || 'http://localhost:5173',
  url: process.env.URL || 'http://localhost:3000'
}
