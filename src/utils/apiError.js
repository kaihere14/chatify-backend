class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true; // mark operational errors vs programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
