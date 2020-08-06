const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;
const cryptocompareApi = require('../cryptocurrency-clients').cryptocompareApi;
const CRYPTO_ICONS = require('../cryptocurrency-clients/').CRYPTO_ICONS;

const getAllCryptocurrencies = async (sparkline, symbols) => {
  const cryptoListApiResponse = await cryptoApi.getAll(symbols);
  const cryptoList = cryptoListApiResponse.data;

  for (const crypto of cryptoList) {
    crypto.image = CRYPTO_ICONS[crypto.id];

    if (sparkline) {
      let id = cryptocompareApi.CRYPTOCOMPARE_ID_MAP[crypto.id];
      id === 'XML' ? (id = 'BTC') : null;
      const result = await cryptocompareApi.getSparkLine(id);

      crypto.sparkLineData = mapToSparkLineArray(result.data);
    }
  }

  return cryptoList;
};

function mapToSparkLineArray(data) {
  console.log(data.Data.Data);
  return data.Data.Data.map((value) => {
    return [value.time, value.open];
  });
}

const getCryptocurrenciesPriceMap = async (symbols) => {
  const result = await getAllCryptocurrencies(false, symbols);
  return result.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr.current_price };
  }, {});
};

const getCryptocurrenciesIconsList = async () => {
  const result = await getAllCryptocurrencies(false);
  const cryptocurrencyIconsMap = [];
  for (const crypto of result) {
    crypto.image = CRYPTO_ICONS[crypto.id];
    cryptocurrencyIconsMap.push({ name: crypto.name, icon: CRYPTO_ICONS[crypto.id] });
  }
  return cryptocurrencyIconsMap;
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

function compressArray(array) {
  const arr = [];
  const delta = 18;
  for (let i = 0; i < array.length; i += delta) {
    arr.push(array[i]);
  }
  array = arr;
  return array;
}

function getFirstElementOrEmptyString(array) {
  if (array.length) {
    return array[0];
  } else {
    return '';
  }
}

module.exports = {
  getAllCryptocurrencies,
  getCryptocurrenciesPriceMap,
  getCryptocurrenciesIconsList,
  getCryptocurrencyDetails,
};
