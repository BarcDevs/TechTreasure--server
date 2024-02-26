export default {
  env: process.env.NODE_ENV || 'development',

  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || '10',
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || '90',

  mongoUsername: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME
}
