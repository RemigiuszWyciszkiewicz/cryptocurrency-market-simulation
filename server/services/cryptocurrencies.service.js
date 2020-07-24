const { async } = require('rxjs/internal/scheduler/async');
const assetsService = require('../services/assets.service');
const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;
const CRYPTO_ICONS = require('../cryptocurrency-clients/').CRYPTO_ICONS;
const { head } = require('lodash');
const getAllCryptocurrencies = async (symbols) => {
  const cryptoListApiResponse = await cryptoApi.getAll(symbols);
  const cryptoList = cryptoListApiResponse.data;
  cryptoList.forEach((value) => {
    value.image = CRYPTO_ICONS[value.id];
  });

  return cryptoList;
};

const getCryptocurrenciesPriceMap = async (symbols) => {
  const result = await getAllCryptocurrencies(symbols);
  return result.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.current_price };
  }, {});
};

const getCryptocurrencyDetails = async (symbol) => {
  const result = await cryptoApi.getDetails(symbol);
  const data = result.data;

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image.large,
    description: data.description.en,
    market_cap_rank: data.market_cap_rank,
    last_updated: data.last_updated,
    current_price: data.market_data.current_price.usd,
    market_cap: data.market_data.market_cap.usd,
    price_change_percentage_24h: data.market_data.price_change_24h,
    price_change_percentage_7d: data.market_data.price_change_percentage_7d,
    price_change_percentage_30d: data.market_data.price_change_percentage_30d,
    links: {
      homepage: getFirstElementOrEmptyString(data.links.homepage),
      subreddit_url: data.links.subreddit_url,
      repos_url: getFirstElementOrEmptyString(data.links.repos_url.github),
      blockchain_site: getFirstElementOrEmptyString(data.links.blockchain_site),
      official_forum_url: getFirstElementOrEmptyString(data.links.official_forum_url),
    },
    community_data: {
      ...data.community_data,
    },
  };
};

function getFirstElementOrEmptyString(array) {
  if (array.length) {
    return array[0];
  } else {
    return '';
  }
}

module.exports = { getAllCryptocurrencies, getCryptocurrenciesPriceMap, getCryptocurrencyDetails };
