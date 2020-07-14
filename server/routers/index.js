const cryptocurrencies_router = require("./cryptocurrencies");
const authorization_router = require("./authorization");

module.exports = {
  A_router: cryptocurrencies_router,
  B_router: authorization_router,
};
