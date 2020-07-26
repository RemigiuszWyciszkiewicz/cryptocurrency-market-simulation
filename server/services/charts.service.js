const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;

const getCryptocurrencyLinearChartData = async (symbol) => {
  const result = await cryptoApi.getLineChartData(symbol, 30);

  return result.data;
};

module.exports = { getCryptocurrencyLinearChartData };
