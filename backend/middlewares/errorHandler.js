/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  
  module.exports = errorHandler;
  