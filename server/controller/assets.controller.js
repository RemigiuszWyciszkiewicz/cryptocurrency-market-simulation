const { ErrorResponse } = require('../data-access');
const { async } = require('rxjs/internal/scheduler/async');
const { idText } = require('typescript');

const assetsService = require('../services').assetsService;
const userService = require('../services').userService;

const getAll = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const assets = await assetsService.getAllAssets(userId);
    res.send(assets);

    next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
    return next();
  }
};

const getPortfolioSummaryData = async (req, res, next) => {
  let userId;

  const summarydata = {};

  if (req.params && req.params.userId) {
    userId = req.params.userId;
  } else {
    res.status(404).send(new ErrorResponse('userIdError', 'UserId has not been specified'));
    return next();
  }

  try {
    const crypto = await assetsService.getOwnedAssetsValueMap(userId);
    const userUSD = await userService.getUserUSD(userId);
    const assetPurchaseConst = await assetsService.getAssetsPurchaseCostMap(userId);

    summarydata.USD = userUSD.usd;
    summarydata.totalAssetsPurchaseCost = Object.values(assetPurchaseConst).reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    summarydata.totalPortfolioValue = Object.values(crypto).reduce((prev, curr) => {
      return prev + curr;
    }, userUSD.usd);

    res.send(summarydata);
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('canNotFetchUserAssets', 'Durning fetching user assets error has occured'));
  }
};

const getAssetsDetails = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const assetPurchaseConst = await assetsService.getAssetsPurchaseCostMap(userId);
    const assetsValue = await assetsService.getOwnedAssetsValueMap(userId);
    const assetsQuantity = await assetsService.getAssetsQuantityMap(userId);
    const result = Object.keys(assetsValue).reduce((prev, curr) => {
      return [
        ...prev,
        { id: curr, value: assetsValue[curr], quantity: assetsQuantity[curr], purchaseCost: assetPurchaseConst[curr] },
      ];
    }, []);

    res.send(result);
    return next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('canNotFetchAssets', 'Durning fetching user assets error has occured'));
    return next();
  }
};

module.exports = { getAll, getPortfolioSummaryData, getAssetsDetails };
