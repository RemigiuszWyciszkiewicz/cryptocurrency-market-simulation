const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;

const getCryptocurrencyLinearChartData = async (symbol) => {
  const result = await cryptoApi.getLineChartData(symbol);

  return result.data;
};

module.exports = { getCryptocurrencyLinearChartData };
