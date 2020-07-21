const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;
const cryptocurrenciesService = require('../services').cryptocurennciesService;
const getAll = async (res, req) => {
  let data;
  try {
    data = await cryptocurrenciesService.getAllCryptocurrencies();

    if (data.data) {
      res.res.send(data.data);
    }
  } catch (error) {
    res.res.send('Can not fetch coins list.');
  }
};

module.exports = { getAll };
