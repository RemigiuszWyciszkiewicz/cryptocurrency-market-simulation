const User = require('../data-access/models').User;

const addAssetToUser = async (userId, asset) => {
  await User.findById(userId)
    .exec()
    .then((user) => {
      user.assets.push({ ...asset });
      user.save();
    });
};

const updateAsset = async (userId, transaction) => {
  const user = await User.findOne({
    _id: userId,
  });

  //TODO find better way to extract asset from user.
  const index = user.assets.findIndex((asset) => {
    return asset.cryptocurrency === transaction.cryptocurrency;
  });

  // recalculate asset after transaction
  user.assets[index].amount = user.assets[index].amount + transaction.amount;
  user.assets[index].purchaseCost = user.assets[index].purchaseCost + transaction.value;
  user.assets[index].lastUpdate = new Date().toISOString();

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

module.exports = { addAssetToUser, checkIfAssetAlreadyExists, mapTransactionToAsset, updateAsset };
