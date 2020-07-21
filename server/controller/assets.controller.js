const { ErrorResponse } = require('../data-access');
const User = require('../data-access/models').User;
const assetsService = require('../services').assetsService;
const getAll = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({
      _id: userId,
    });

    res.send(user.assets);

    next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
    return next();
  }
};

module.exports = { getAll };
