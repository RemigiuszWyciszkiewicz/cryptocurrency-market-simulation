const User = require('../data-access/models').User;
const userService = require('./user.service');
const cryptoService = require('./cryptocurrencies.service');
const { async } = require('rxjs/internal/scheduler/async');

const addAssetToUser = async (userId, asset) => {
  await User.findById(userId)
    .exec()
    .then((user) => {
      user.usd -= asset.purchaseCost;
      user.assets.push({ ...asset });
      user.save();
    });
};

const getAllAssets = async (userId) => {
  const user = await userService.getUser(userId);

  return user.assets;
};

const getAsset = async (user, cryptocurrencyId) => {
  //TODO find better way to extract asset from user.
  const index = user.assets.findIndex((asset) => {
    return asset.cryptocurrency === cryptocurrencyId;
  });
  return user.assets[index];
};

const updateAssetOnPurchase = async (userId, transaction) => {
  const user = await userService.getUser(userId);
  const asset = await getAsset(user, transaction.cryptocurrency);

  user.usd -= transaction.value;
  asset.quantity += transaction.quantity;
  asset.purchaseCost += transaction.value;
  asset.lastUpdate = new Date().toISOString();

  user.save();
};

const updateAssetOnSale = async (userId, transaction) => {
  const user = await userService.getUser(userId);
  const asset = await getAsset(user, transaction.cryptocurrency);

  if (asset.quantity < transaction.quantity) {
    throw new Error('Asset quantity exceeded');
  }

  user.usd += transaction.value;

  const factor = 1 - transaction.quantity / asset.quantity;

  asset.purchaseCost = factor * asset.purchaseCost;
  asset.quantity -= transaction.quantity;

  asset.lastUpdate = new Date().toISOString();

  user.save();
};

const checkIfAssetAlreadyExists = async (userId, cryptocurrency) => {
  return await User.find({
    _id: userId,
    assets: { $elemMatch: { cryptocurrency: cryptocurrency } },
  }).exec();
};

const mapTransactionToAsset = (transaction) => {
  return {
    cryptocurrency: transaction.cryptocurrency,
    quantity: transaction.quantity,
    lastUpdate: transaction.date,
    purchaseCost: transaction.value,
  };
};

const getAssetsQuantityMap = async (userId) => {
  const assets = await getAllAssets(userId);

  return assets.reduce((prev, curr) => {
    return { ...prev, [curr.cryptocurrency]: curr.quantity };
  }, {});
};

const getOwnedAssetsValueMap = async (userId, icon) => {
  const ownedCryptoMap = await getAssetsQuantityMap(userId);

  const data = await cryptoService.getAllCryptocurrencies(Object.keys(ownedCryptoMap));
  return data.data.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.current_price * ownedCryptoMap[curr.id] };
  }, {});
};

const getAssetsPurchaseCostMap = async (userId) => {
  const assets = await getAllAssets(userId);
  return assets.reduce((prev, curr) => {
    return { ...prev, [curr.cryptocurrency]: curr.purchaseCost };
  }, {});
};

module.exports = {
  getAllAssets,
  addAssetToUser,
  checkIfAssetAlreadyExists,
  mapTransactionToAsset,
  updateAssetOnPurchase,
  updateAssetOnSale,
  getOwnedAssetsValueMap,
  getAssetsPurchaseCostMap,
  getAssetsQuantityMap,
};
