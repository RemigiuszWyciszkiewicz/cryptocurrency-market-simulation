const cryptocurrencyController = require('./cryptocurrency.controller');
const authorizationController = require('./authorization.controller');

module.exports = {
  cryptoController: cryptocurrencyController,
  authorizationController: authorizationController,
  walletController: null,
};
