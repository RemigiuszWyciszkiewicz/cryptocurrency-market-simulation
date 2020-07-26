const { ErrorResponse } = require('../data-access');
const chartsService = require('../services').chartsService;
const cryptocurennciesService = require('../services').cryptocurennciesService;
const assetsService = require('../services').assetsService;

const getDonutData = async (req, res, next) => {
  try {
    let userId = req.params.userId;

    const cryptoPriceMap = await cryptocurennciesService.getCryptocurrenciesPriceMap();
    const ownedCryptoValueMap = await assetsService.getOwnedAssetsValueMap(userId, cryptoPriceMap);

    const result = { labels: Object.keys(ownedCryptoValueMap), values: Object.values(ownedCryptoValueMap) };

    res.send(result);
    return next();
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('donutChartDataServerError', 'Can not fetch data for donut chart'));
  }
};

const getCryptocurrencyLinearChartData = async (req, res, next) => {
  const id = req.params.cryptoId;

  try {
    const data = await chartsService.getCryptocurrencyLinearChartData(id);
    res.send(data.prices);
  } catch (error) {
    console.log(error);
    res.send(new ErrorResponse('linearChartDataServerError', 'Can not fetch data for linear chart'));
    return next();
  }
};

module.exports = { getDonutData, getCryptocurrencyLinearChartData };
