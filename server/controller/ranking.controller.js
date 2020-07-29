const rankingService = require('../services').rankingService;
const Ranking = require('../data-access/models').Ranking;

const getRanking = async (req, res, next) => {
  try {
    const ranking = await Ranking.find({});
    res.send(ranking);
  } catch (error) {
    console.log(error);
    res.status(404).send('Can not fetch ranking');
  }
};

const getUserRankingInformation = async (req, res, next) => {
  let userId = req.params.userId;

  Ranking.find({ _id: { $lt: userId } })
    .count()
    .exec()
    .then(console.log);
};

module.exports = { getRanking, getUserRankingInformation };
