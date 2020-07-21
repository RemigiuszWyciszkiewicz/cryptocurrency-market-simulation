const { ErrorResponse } = require('../data-access');

const assetsService = require('../services').assetsService;

const getAll = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const assets = await assetsService.getAllAssets(userId);
    res.send(assets);

    next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('invalid id', 'Given user id is invalid'));
    return next();
  }
};

module.exports = { getAll };
