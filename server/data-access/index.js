const mongoose = require('./mongose');
const ErrorResponse = require('./error-response');

module.exports = {
  mongose: mongoose,
  ErrorResponse: ErrorResponse,
};
