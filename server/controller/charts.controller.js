const { ErrorResponse } = require('../data-access');
const { reduce } = require('../cryptocurrency-clients/supported_cryptocurrencies');
const User = require('../data-access/models').User;
const userService = require('../services').userService;
const cryptocurennciesService = require('../services').cryptocurennciesService;
const cryptoController = require('../controller').cryptoController;
const assetsService = require('../services').assetsService;

const getDonutData = async (req, res, next) => {
  try {
    let userId;

    if (req.params && req.params.userId) {
      userId = req.params.userId;
    } else {
      res.status(404).send(new ErrorResponse('userIdError', 'UserId has not been specified'));
      return next();
    }
    const cryptoPriceMap = await cryptocurennciesService.getCryptocurrenciesPriceMap();
    const ownedCryptoValueMap = await assetsService.getOwnedAssetsValueMap(userId, cryptoPriceMap);

    const result = { labels: Object.keys(ownedCryptoValueMap), values: Object.values(ownedCryptoValueMap) };

    res.send(result);
    return next();
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('donutChartDataServerError', 'can not fetch data for donut chart'));
  }
};

module.exports = { getDonutData };
