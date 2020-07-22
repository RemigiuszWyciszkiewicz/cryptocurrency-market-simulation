const { ErrorResponse } = require('../data-access');
const { reduce } = require('../cryptocurrency-clients/supported_cryptocurrencies');
const User = require('../data-access/models').User;
const userService = require('../services').userService;
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

    const cryptoValueMap = await assetsService.getOwnedAssetsValueMap(userId);

    const result = { labels: Object.keys(cryptoValueMap), values: Object.values(cryptoValueMap) };

    res.send(result);
    return next();
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('donutChartDataServerError', 'can not fetch data for donut chart'));
  }
};

module.exports = { getDonutData };
