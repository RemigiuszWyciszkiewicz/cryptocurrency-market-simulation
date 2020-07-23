const rankingService = require('../services').rankingService;

const getRanking = async (req, res, next) => {
  const result = await rankingService.getRanking();
  console.log(result);
  res.send(result);
};

module.exports = { getRanking };
