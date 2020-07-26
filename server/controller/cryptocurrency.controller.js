const cryptocompareApi = require('../cryptocurrency-clients').cryptocompareApi;
const cryptocurrenciesService = require('../services').cryptocurennciesService;
const getAll = async (res, req) => {
  let data;
  try {
    data = await cryptocurrenciesService.getAllCryptocurrencies(true);

    if (data) {
      res.res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.res.send('Can not fetch coins list.');
  }
};

const getDetails = async (res, req) => {
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

const getNews = async (res, req) => {
  const id = req.req.params.id;

  try {
    const results = await cryptocompareApi.getNews(id);
    res.res.send(results.data.Data);
  } catch (error) {
    res.res.send('Can not fetch news list.');
    console.log(error);
  }
};

module.exports = { getAll, getDetails, getNews };
