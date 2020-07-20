const cryptocurrencyController = require('./cryptocurrency.controller');
const authorizationController = require('./authorization.controller');
const transactionsController = require('./transaction.controller');

module.exports = {
  cryptoController: cryptocurrencyController,
  authorizationController: authorizationController,
  walletController: null,
  transactionsController: transactionsController,
};
