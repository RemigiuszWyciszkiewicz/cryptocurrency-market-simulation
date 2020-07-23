const cryptocurrenciesRouter = require('./cryptocurrencies.route');
const authorizationRouter = require('./authorization.route');
const transactionsRouter = require('./transactions.route');
const assetsRouter = require('./assets.route');
const chartsRouter = require('./charts.router');
const rankingRouter = require('./ranking.router');

module.exports = {
  cryptocurrenciesRouter: cryptocurrenciesRouter,
  authorizationRouter: authorizationRouter,
  transactionsRouter: transactionsRouter,
  assetsRouter: assetsRouter,
  chartsRouter: chartsRouter,
  rankingRouter: rankingRouter,
};
