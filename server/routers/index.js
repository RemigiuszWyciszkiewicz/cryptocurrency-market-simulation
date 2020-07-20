const cryptocurrenciesRouter = require('./cryptocurrencies.route');
const authorizationRouter = require('./authorization.route');
const transactionsRouter = require('./transactions.route');
const assetsRouter = require('./assets.route');

module.exports = {
  cryptocurrenciesRouter: cryptocurrenciesRouter,
  authorizationRouter: authorizationRouter,
  transactionsRouter: transactionsRouter,
  assetsRouter: assetsRouter,
};
