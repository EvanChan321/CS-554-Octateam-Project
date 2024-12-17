const formatResponse = (message, data = null, success = true) => {
  return { success, message, data };
};

export default formatResponse;
