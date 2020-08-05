const User = require('../data-access/models').User;
const Ranking = require('../data-access/models').Ranking;
const Transaction = require('../data-access/models').Transaction;
const getFixedUser = require('../data-access/utils').getFixedUser;

const tokenValidation = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const userRank = await Ranking.find({ _id: user._id }).select({ rank: 1 });
    res.send({ ...getFixedUser(user), userRank: userRank[0].rank });
    return next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('tokenValidityError', error.message));
  }
};

const resetAccount = async (req, res, next) => {
  res.send('account deleted');
};
module.exports = { resetAccount, tokenValidation };
