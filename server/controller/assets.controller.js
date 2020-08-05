const { ErrorResponse } = require('../data-access');
const { cryptocurennciesService } = require('../services');
const { CRYPTO_ICONS } = require('../cryptocurrency-clients');
const assetsService = require('../services').assetsService;

const getPortfolioSummaryData = async (req, res, next) => {
  let userId;

  if (req.params && req.params.userId) {
    userId = req.params.userId;
  } else {
    res.status(404).send(new ErrorResponse('userIdError', 'UserId has not been specified'));
    return next();
  }

  try {
    const cryptoMap = await cryptocurennciesService.getCryptocurrenciesPriceMap();
    const assetsSummary = await assetsService.getAssetSummary(userId, cryptoMap);

    res.send(assetsSummary);
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('canNotFetchUserAssets', 'Durning fetching user assets error has occured'));
  }
};

const getAll = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cryptoMap = await cryptocurennciesService.getCryptocurrenciesPriceMap();
    const assetPurchaseConst = await assetsService.getAssetsPurchaseCostMap(userId);
    const assetsValue = await assetsService.getOwnedAssetsValueMap(userId, cryptoMap);
    const assetsQuantity = await assetsService.getAssetsQuantityMap(userId);
    const result = Object.keys(assetsValue).reduce((prev, curr) => {
      return [
        ...prev,
        {
          id: curr,
          value: assetsValue[curr],
          quantity: assetsQuantity[curr],
          purchaseCost: assetPurchaseConst[curr],
          icon: CRYPTO_ICONS[curr],
        },
      ];
    }, []);
    console.log('assets has been fetched, results:', result.length);
    res.send(result);
    return next();
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('canNotFetchAssets', 'Durning fetching user assets error has occured'));
    return next();
  }
};

module.exports = { getAll, getPortfolioSummaryData };
