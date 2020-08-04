const rankingService = require('../services').rankingService;
const Ranking = require('../data-access/models').Ranking;

const getRanking = async (req, res, next) => {
  try {
    const ranking = await Ranking.find({}).sort('rank');
    res.send(ranking);
  } catch (error) {
    console.log(error);
    res.status(404).send('Can not fetch ranking');
  }
};

const getUserRankingInformation = async (req, res, next) => {
  let userId = req.params.userId;
  try {
    const userRank = await Ranking.find({ _id: userId }).select({ rank: 1 });
    const usersCount = await Ranking.count();

    res.send({ count: usersCount, rank: userRank[0].rank });
  } catch (error) {
    console.log(error);
    res.status(404).send('Can not fetch user ranking information');
  }
};

module.exports = { getRanking, getUserRankingInformation };
