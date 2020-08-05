const cryptocurrencyController = require('./cryptocurrency.controller');
const authorizationController = require('./authorization.controller');
const transactionsController = require('./transaction.controller');
const assetsController = require('./assets.controller');
const chartsController = require('./charts.controller');
const rankingController = require('./ranking.controller');
const userController = require('./user.controller');

module.exports = {
  cryptoController: cryptocurrencyController,
  authorizationController: authorizationController,
  assetsController: assetsController,
  transactionsController: transactionsController,
  rankingController: rankingController,
  chartsController: chartsController,
  userController: userController,
};
