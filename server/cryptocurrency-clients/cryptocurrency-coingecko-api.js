const axios = require('axios').default;
const SUPPORTED_CRYPTOCURRENCIES = require('./supported_cryptocurrencies');

const getAll = async (cryptocurrencies = SUPPORTED_CRYPTOCURRENCIES) => {
  return await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: cryptocurrencies.join(','),
    },
  });
};

const getDetails = async (symbol) => {
  return await axios.get('https://api.coingecko.com/api/v3/coins/' + symbol, {
    params: { developer_data: false, tickers: false },
  });
};

const getLineChartData = async (symbol, days) => {
  return await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`, {
    params: { vs_currency: 'usd', days: days },
  });
};

module.exports.getAll = getAll;
module.exports.getDetails = getDetails;
module.exports.getLineChartData = getLineChartData;
