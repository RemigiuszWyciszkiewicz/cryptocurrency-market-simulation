const User = require('../data-access/models').User;

const getUser = async (userId) => {
  return await User.findOne({
    _id: userId,
  });
};

const getUserUSD = async (userId) => {
  return await User.findOne(
    {
      _id: userId,
    },
    {
      _id: 0,
      usd: 1,
    }
  );
};

// difference: pass -100 to subtract 100 from USD | pass 100 to add 100 to USD
const updateUserUSD = async (userId, difference) => {
  return await User.findOne(
    {
      _id: userId,
    },
    {
      _id: 0,
      USD: 1,
    }
  );
};

module.exports = { getUser, getUserUSD, updateUserUSD };
