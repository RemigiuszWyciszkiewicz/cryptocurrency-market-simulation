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
  console.log(req.body);
  User.findById(req.params.userId);
  res.send('JEST OK');
  return next();
};

module.exports = { getAll, save };
