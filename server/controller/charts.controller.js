const { ErrorResponse } = require('../data-access');
const User = require('../data-access/models').User;
const cryptoService = require('../services').cryptocurennciesService;
const cryptoController = require('../controller').cryptoController;
const assetsService = require('../services').assetsService;

const getDonutData = async (req, res, next) => {
  try {
    const assets = await assetsService.getAllAssets(req.params.userId);
    const assetsQuantityMap = assets.reduce((prev, curr) => {
      return { ...prev, [curr.cryptocurrency]: curr.quantity };
    }, {});
    const data = await cryptoService.getAllCryptocurrencies(Object.keys(assetsQuantityMap));

    const result = data.data.reduce(
      (prev, curr) => {
        return { labels: [...prev.labels, curr.id], values: [...prev.values, assetsQuantityMap[curr.id] * curr.current_price] };
      },
      { labels: [], values: [] }
    );

    res.send(result);
    return next();
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('donutChartDataServerError', 'can not fetch data for donut chart'));
  }
};

module.exports = { getDonutData };
