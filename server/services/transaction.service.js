const User = require('../data-access/models').User;
const assetsService = require('./assets.service');

const getTransactions = async (userId, limit) => {
  return await User.findById(userId)
    .populate({ path: 'transactions', options: { limit: limit, sort: { date: -1 } } })
    .limit(10)
    .exec();
};

const handlePurchaseTransaction = async (userId, transaction) => {
  const result = await assetsService.checkIfAssetAlreadyExists(userId, transaction.cryptocurrency);
  if (result.length) {
    await assetsService.updateAssetOnPurchase(userId, transaction);
  } else {
    await assetsService.addAssetToUser(userId, assetsService.mapTransactionToAsset(transaction.toObject()));
  }
};

const handleSaleTransaction = async (userId, transaction) => {
  await assetsService.updateAssetOnSale(userId, transaction);
};

const saveTransaction = async (userId, transaction) => {
  await User.findById(userId)
    .exec()
    .then(async (user) => {
      await transaction.save();

      user.transactions.push(transaction);
      user.save();
    });
};

module.exports = { getTransactions, saveTransaction, handleSaleTransaction, handlePurchaseTransaction };
