const { async } = require('rxjs/internal/scheduler/async');
const assetsService = require('../services/assets.service');
const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;
const CRYPTO_ICONS = require('../cryptocurrency-clients/').CRYPTO_ICONS;

const getAllCryptocurrencies = async (symbols) => {
  const cryptoListApiResponse = await cryptoApi.getAll(symbols);
  const cryptoList = cryptoListApiResponse.data;
  cryptoList.forEach((value) => {
    value.image = CRYPTO_ICONS[value.id];
  });

  return cryptoList;
};

const getCryptocurrenciesPriceMap = async (symbols) => {
  const result = await getAllCryptocurrencies(symbols);
  return result.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.current_price };
  }, {});
};

const getCryptocurrencyDetails = async (symbol) => {
  const result = await cryptoApi.getDetails(symbol);

  return result.data;
};

module.exports = { getAllCryptocurrencies, getCryptocurrenciesPriceMap, getCryptocurrencyDetails };
