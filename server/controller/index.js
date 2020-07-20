const cryptocurrencyController = require('./cryptocurrency.controller');
const authorizationController = require('./authorization.controller');
const transactionsController = require('./transaction.controller');
const assetsController = require('./assets.controller');

module.exports = {
  cryptoController: cryptocurrencyController,
  authorizationController: authorizationController,
  assetsController: assetsController,
  transactionsController: transactionsController,
};
