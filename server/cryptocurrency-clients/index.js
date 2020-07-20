const coingeckoApi = require('./cryptocurrency-coingecko-api');
const SUPPORTED_CRYPTOCURRENCIES = require('./supported_cryptocurrencies');
module.exports = {
  coingeckoApi: coingeckoApi,
  SUPPORTED_CRYPTOCURRENCIES: SUPPORTED_CRYPTOCURRENCIES,
};
