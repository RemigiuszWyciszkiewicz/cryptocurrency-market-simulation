const { User, Transaction } = require('../data-access/models');
const { ErrorResponse } = require('../data-access');
const assetsService = require('../services').assetsService;
const getAll = async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.userId).populate('transactions').exec();
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));

    return next();
  }

  if (!user) {
    res.status(404).send(new ErrorResponse('notFound', 'User with given id does not exist.'));

    return next();
  }

  res.send(user.transactions);
  return next();
};

const save = async (req, res, next) => {
  const userId = req.params.userId;

  const transaction = new Transaction({
    date: new Date().toISOString(),
    amount: req.body.amount,
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

  if (transaction.type === 'purchase') {
    await handlePurchaseTransaction(userId, transaction);
  }

  if (transaction.type === 'sale') {
    await handlePurchaseTransaction(userId, transaction);
  }

  try {
    await saveTransaction(userId, transaction);
  } catch (error) {
    console.log(error);
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
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

// async function handleSaleTransaction(userId, transaction) {
//   await assetsService.
// }

async function saveTransaction(userId, transaction) {
  await User.findById(userId)
    .exec()
    .then(async (user) => {
      await transaction.save();
      user.transactions.push(transaction);
      user.save();
    });
}

function roundToX(num, X) {
  return +(Math.round(num + 'e+' + X) + 'e-' + X);
}

module.exports = { getAll, save };
