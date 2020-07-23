const Ranking = require('../data-access/models').Ranking;
const User = require('../data-access/models').User;
const cryptoService = require('../services/cryptocurrencies.service');

const getRanking = async () => {
  const cryptocurrencies = await cryptoService.getCryptocurrenciesPriceMap();
  const users = await User.find(
    {},
    {
      _id: 1,
      email: 1,
      name: 1,
    }
  ).exec();

  users.map((value) => {});

  return cryptocurrencies;
};

module.exports = { getRanking };
