const coingeckoApi = require('./cryptocurrency-coingecko-api');
const cryptocompareApi = require('./cryptocurrency-cryptocompare-api');
const SUPPORTED_CRYPTOCURRENCIES = require('./supported_cryptocurrencies');
const CRYPTO_ICONS = require('./icons-urls').CRYPTO_ICONS;
module.exports = {
  coingeckoApi: coingeckoApi,
  cryptocompareApi: cryptocompareApi,
  SUPPORTED_CRYPTOCURRENCIES: SUPPORTED_CRYPTOCURRENCIES,
  CRYPTO_ICONS: CRYPTO_ICONS,
};
