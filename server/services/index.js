const assetsService = require('./assets.service');
const userService = require('./user.service');
const cryptocurennciesService = require('./cryptocurrencies.service');
const chartsService = require('./charts.service');
const transactionService = require('./transaction.service');
const rankingService = require('./ranking.service');

module.exports = {
  assetsService: assetsService,
  userService: userService,
  cryptocurennciesService: cryptocurennciesService,
  chartsService: chartsService,
  rankingService: rankingService,
  transactionService: transactionService,
};
