const cryptocurrenciesRouter = require('./cryptocurrencies.route');
const authorizationRouter = require('./authorization.route');
const transactionsRouter = require('./transactions.route');

module.exports = {
  cryptocurrenciesRouter: cryptocurrenciesRouter,
  authorizationRouter: authorizationRouter,
  transactionsRouter: transactionsRouter,
};
