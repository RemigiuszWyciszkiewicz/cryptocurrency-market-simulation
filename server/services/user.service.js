const User = require('../data-access/models').User;

const getUser = async (userId) => {
  return await User.findOne({
    _id: userId,
  });
};
module.exports = { getUser };
