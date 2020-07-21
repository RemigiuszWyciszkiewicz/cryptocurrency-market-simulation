const { constants } = require('os');

const User = require('../data-access/models').User;
const userService = require('./user.service');

const addAssetToUser = async (userId, asset) => {
  await User.findById(userId)
    .exec()
    .then((user) => {
      user.assets.push({ ...asset });
      user.save();
    });
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

  asset.amount = asset.amount + transaction.amount;
  asset.purchaseCost = asset.purchaseCost + transaction.value;
  asset.lastUpdate = new Date().toISOString();

  user.save();
};

const updateAssetOnSale = async (userId, transaction) => {
  const user = await userService.getUser(userId);
  const asset = await getAsset(user, transaction.cryptocurrency);

  if (asset.amount < transaction.amount) {
  }
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
    amount: transaction.amount,
    lastUpdate: transaction.date,
    purchaseCost: transaction.value,
  };
};

module.exports = { addAssetToUser, checkIfAssetAlreadyExists, mapTransactionToAsset, updateAssetOnPurchase };
