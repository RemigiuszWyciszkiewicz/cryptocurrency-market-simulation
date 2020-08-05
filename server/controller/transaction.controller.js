const { Transaction } = require('../data-access/models');
const { ErrorResponse } = require('../data-access');

const transactionService = require('../services').transactionService;

const getList = async (req, res, next) => {
  const userId = req.params.userId;

  const limit = req.query && req.query.limit ? req.query.limit : 100;
  let transactions;

  try {
    transactions = await transactionService.getTransactions(userId, limit);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    const invalidFields = Object.keys(error.errors);
    res.status(404).send(new ErrorResponse('invalidFileds', 'Given properties are invalid: ' + invalidFields.join(',')));
    return next();
  }

  transaction.value = req.body.value;

  try {
    if (transaction.type === 'purchase') {
      await transactionService.handlePurchaseTransaction(userId, transaction);
    }

    if (transaction.type === 'sale') {
      await transactionService.handleSaleTransaction(userId, transaction);
    }

    await transactionService.saveTransaction(userId, transaction);
  } catch (error) {
    res.status(404).send(new ErrorResponse('ERROR ', error.message));
    return next();
  }

  res.send(transaction);
  return next();
};

module.exports = { getList, save };
