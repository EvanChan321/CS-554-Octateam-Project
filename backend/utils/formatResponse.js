/**
 * Format API Response
 * @param {string} message - Response message
 * @param {object} data - Data to send in the response
 * @param {boolean} success - Whether the operation was successful
 */
const formatResponse = (message, data = null, success = true) => {
    return {
      success,
      message,
      data
    };
  };
  
  module.exports = formatResponse;
  