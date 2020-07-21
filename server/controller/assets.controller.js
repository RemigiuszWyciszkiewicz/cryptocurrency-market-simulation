const { ErrorResponse } = require('../data-access');
const User = require('../data-access/models').User;
const userService = require('../services').userService;

const getAll = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUser(userId);

    res.send(user.assets);

    next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
    return next();
  }
};

module.exports = { getAll };
