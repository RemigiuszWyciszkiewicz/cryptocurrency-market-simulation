const rankingService = require('../services').rankingService;
const Ranking = require('../data-access/models').Ranking;
const getRanking = async (req, res, next) => {
  try {
    const ranking = await Ranking.find({}).exec();
    res.send(ranking);
  } catch (error) {
    res.status(404).send('can not fetch ranking');
  }
};

module.exports = { getRanking };
