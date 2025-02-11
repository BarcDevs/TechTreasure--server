if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment");
}

export default {
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string || '7d' ,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || '10',
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN as string || '90',

  mongoUsername: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME
}
