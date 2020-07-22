const { User, Transaction } = require('../data-access/models');
const { ErrorResponse } = require('../data-access');
const assetsService = require('../services').assetsService;
const transactionService = require('../services').transactionService;

const getList = async (req, res, next) => {
  const userId = req.params.userId;

  const limit = req.query && req.query.limit ? req.query.limit : 100;
  let transactions;

  try {
    transactions = await transactionService.getTransactions(userId, limit);
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));

    return next();
  }

  res.send(transactions.transactions);
  return next();
};

const save = async (req, res, next) => {
  const userId = req.params.userId;

  const transaction = new Transaction({
    date: new Date().toISOString(),
    quantity: req.body.quantity,
    price: req.body.price,
    cryptocurrency: req.body.cryptocurrency,
    type: req.body.type,
  });

  const error = transaction.validateSync();

  if (error) {
    const invalidFields = Object.keys(error.errors);
    res.status(404).send(new ErrorResponse('invalidFileds', 'Given properties are invalid: ' + invalidFields.join(',')));
    return next();
  }

  transaction.value = req.body.value;

  try {
    if (transaction.type === 'purchase') {
      await handlePurchaseTransaction(userId, transaction);
    }

    if (transaction.type === 'sale') {
      await handleSaleTransaction(userId, transaction);
    }

    await saveTransaction(userId, transaction);
  } catch (error) {
    res.status(404).send(new ErrorResponse('ERROR ', error.message));
    return next();
  }

  res.send(transaction);
  return next();
};

async function handlePurchaseTransaction(userId, transaction) {
  const result = await assetsService.checkIfAssetAlreadyExists(userId, transaction.cryptocurrency);
  if (result.length) {
    await assetsService.updateAssetOnPurchase(userId, transaction);
  } else {
    await assetsService.addAssetToUser(userId, assetsService.mapTransactionToAsset(transaction.toObject()));
  }
}

async function handleSaleTransaction(userId, transaction) {
  await assetsService.updateAssetOnSale(userId, transaction);
}

async function saveTransaction(userId, transaction) {
  await User.findById(userId)
    .exec()
    .then(async (user) => {
      await transaction.save();
      user.transactions.push(transaction);
      user.save();
    });
}

module.exports = { getList, save };
