declare module 'config' {
  export const jwtSecret: string
  export const jwtExpiresIn: string
  export const bcryptSaltRounds: string
  export const jwtCookieExpiresIn: string

  export const mongoUsername: string
  export const mongoPassword: string
  export const mongoUri: string
  export const mongoDbName: string

  export const stripePublishableKey: string
  export const stripeSecretKey: string
}
