class AppError extends Error {
  private readonly statusCode: number
  private readonly status: 'failed' | 'error'
  private readonly isOperational: boolean

  constructor(statusCode: number, message: string) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error'
    this.isOperational = true
  }
}

export default AppError
