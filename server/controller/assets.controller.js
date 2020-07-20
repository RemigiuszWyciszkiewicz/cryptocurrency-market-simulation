const { ErrorResponse } = require('../data-access');
const { ModuleResolutionKind } = require('typescript');

const getAll = async (req, res, next) => {
  res.send('GET ALL');
};

const save = async (req, res, next) => {
  res.send('saved');
};

module.exports = { getAll, save };
