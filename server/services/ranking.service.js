const Ranking = require('../data-access/models').Ranking;
const User = require('../data-access/models').User;
const cryptoService = require('../services/cryptocurrencies.service');
const assetsService = require('../services/assets.service');
var { sortBy, forEach } = require('lodash');

const appendRankToRankingEntity = (value, index) => {
  value.rank = index + 1;
};

async function createRanking() {
  await Ranking.remove({}).exec();
  const cryptocurrencies = await cryptoService.getCryptocurrenciesPriceMap();

  const users = await User.find(
    {},
    {
      _id: 1,
      email: 1,
      name: 1,
    }
  ).exec();

  let result = [];
  for (const user of users) {
    const summary = await assetsService.getAssetSummary(user._id, cryptocurrencies);
    summary.change = ((summary.totalPortfolioValue - 50000) / 50000) * 100;
    delete summary.totalAssetsPurchaseCost;
    delete summary.USD;
    result.push({ ...user.toObject(), ...summary });
  }

  let ranking = forEach(sortBy(result, ['totalPortfolioValue']).reverse(), appendRankToRankingEntity);

  Ranking.create(ranking, {}, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      console.log('Ranking updated');
    }
  });
}

function startGenerateRanking(interval) {
  createRanking();

  setInterval(createRanking, interval);
}

module.exports.startGenerateRanking = startGenerateRanking;
