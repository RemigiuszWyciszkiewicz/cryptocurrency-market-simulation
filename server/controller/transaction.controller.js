const { User, Transaction } = require('../data-access/models');
const { ErrorResponse } = require('../data-access');

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

  transaction.value = roundToX(transaction.price * transaction.amount, 2);

  try {
    User.findById(req.params.userId)
      .exec()
      .then(async (user) => {
        await transaction.save();
        user.transactions.push(transaction);
        user.save();
      });
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
    return next();
  }

  res.send(req.body);
  return next();
};

function roundToX(num, X) {
  return +(Math.round(num + 'e+' + X) + 'e-' + X);
}

module.exports = { getAll, save };
