const axios = require('axios').default;
const SUPPORTED_CRYPTOCURRENCIES = require('./supported_cryptocurrencies');

let getAll = (cryptocurrencies = SUPPORTED_CRYPTOCURRENCIES) => {
  return axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: cryptocurrencies.join(','),
    },
  });
};

let getDetails = () => {
  return 'test';
};

module.exports.getAll = getAll;
module.exports.getDetails = getDetails;
