const User = require('../data-access/models').User;

const getTransactions = async (userId, limit) => {
  return await User.findById(userId)
    .populate({ path: 'transactions', options: { limit: limit, sort: { date: -1 } } })
    .limit(10)
    .exec();
};

module.exports = { getTransactions };
