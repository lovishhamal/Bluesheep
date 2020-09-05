const httpStatus = require('http-status-codes');

responseBody = (status, data, token, message = null) => {
  return {
    status,
    data,
    token,
    message,
  };
};

const httpResponse = {
  errorHandler(response, error, status) {
    response.json(responseBody(status, null, null, error));
  },
  successHandler(response, data, message) {
    response
      .status(httpStatus.OK)
      .send(responseBody('success', data, null, message));
  },
  tokenHandler(response, token, message) {
    response
      .status(httpStatus.OK)
      .send(responseBody('success', null, token, message));
  },
  unAuthorized(response, error) {
    response
      .status(error.statusCode || HttpStatus.UNAUTHORIZED)
      .send(responseBody('unauthorized', null, null, error.message || error));
  },
};

module.exports = httpResponse;
