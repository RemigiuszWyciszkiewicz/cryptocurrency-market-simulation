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
  let quantity;
  let id;
  if (req.req.query && req.req.query.limit) {
    quantity = req.req.query.limit;
  }
  if (req.req.params && req.req.params.id) {
    id = req.req.params.id;
  }

  try {
    const results = await cryptocompareApi.getNews(id);
    const news = quantity ? results.data.Data.slice(0, quantity) : results.data.Data;
    res.res.send(news);
  } catch (error) {
    res.res.send('Can not fetch news list.');
    console.log(error);
  }
};

const getIconsList = async (res, req) => {
  let crytpcurrencyIcons;
  try {
    crytpcurrencyIcons = await cryptocurrenciesService.getCryptocurrenciesIconsList();

    res.res.send(crytpcurrencyIcons);
  } catch (error) {
    res.res.send('Can not fetch icons.');
    console.log(error);
  }
};

module.exports = { getAll, getDetails, getNews, getIconsList };
