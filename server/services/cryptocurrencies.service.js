const { async } = require('rxjs/internal/scheduler/async');
const assetsService = require('../services/assets.service');
const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;

const getAllCryptocurrencies = async (symbols) => {
  return await cryptoApi.getAll(symbols);
};

const getCryptocurrenciesPriceMap = async (symbols) => {
  const result = await getAllCryptocurrencies(symbols);
  return result.data.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.current_price };
  }, {});
};

module.exports = { getAllCryptocurrencies, getCryptocurrenciesPriceMap };
