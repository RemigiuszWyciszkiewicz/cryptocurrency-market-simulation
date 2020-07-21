const { ErrorResponse } = require('../data-access');
const User = require('../data-access/models').User;

const getAll = async (req, res, next) => {
  try {
    const results = await User.find({
      _id: req.params.userId,
      assets: { $elemMatch: { cryptocurrency: req.body.cryptocurrency } },
    }).exec();
  } catch (error) {
    res.status(404).send(error);
  }

  res.send('GET ALL');
};

const save = async (req, res, next) => {
  res.send('saved');
};

module.exports = { getAll, save };
