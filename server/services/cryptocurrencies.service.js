const { async } = require('rxjs/internal/scheduler/async');
const assetsService = require('../services/assets.service');
const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;

const getAllCryptocurrencies = async (symbols) => {
  return await cryptoApi.getAll(symbols);
};

module.exports = { getAllCryptocurrencies };
