const cryptocurrencies_router = require('./cryptocurrencies.route');
const authorization_router = require('./authorization.route');

module.exports = {
  A_router: cryptocurrencies_router,
  B_router: authorization_router,
};
