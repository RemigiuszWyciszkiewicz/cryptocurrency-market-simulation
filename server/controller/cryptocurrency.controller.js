const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;
const cryptocurrenciesService = require('../services').cryptocurennciesService;
const getAll = async (res, req) => {
  let data;
  try {
    data = await cryptocurrenciesService.getAllCryptocurrencies();

    if (data) {
      res.res.send(data);
    }
  } catch (error) {
    res.res.send('Can not fetch coins list.');
  }
};

const getDetails = async (res, req, next) => {
  const id = req.req.params.id;

  let crytpcurrencyDetails;
  try {
    crytpcurrencyDetails = await cryptocurrenciesService.getCryptocurrencyDetails(id);

    res.res.send(crytpcurrencyDetails);
  } catch (error) {
    res.res.send('Can not fetch coins details.');
    console.log(error);
  }
};

module.exports = { getAll, getDetails };
