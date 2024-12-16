const formatResponse = (message, data = null, success = true) => {
  return { success, message, data };
};

module.exports = formatResponse;
