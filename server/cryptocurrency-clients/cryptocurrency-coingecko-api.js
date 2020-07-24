const axios = require('axios').default;
const SUPPORTED_CRYPTOCURRENCIES = require('./supported_cryptocurrencies');

let getAll = async (cryptocurrencies = SUPPORTED_CRYPTOCURRENCIES) => {
  return await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: cryptocurrencies.join(','),
    },
  });
};

let getDetails = async (symbol) => {
  return await axios.get('https://api.coingecko.com/api/v3/coins/' + symbol, {
    params: { developer_data: false, tickers: false },
  });
};

module.exports.getAll = getAll;
module.exports.getDetails = getDetails;
