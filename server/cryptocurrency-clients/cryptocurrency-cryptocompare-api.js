const axios = require('axios').default;

const CRYPTOCOMPARE_ID_MAP = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  tether: 'USDT',
  ripple: 'XRP',
  'bitcoin-cash': 'BCH',
  cardano: 'ADA',
  litecoin: 'LTC',
  eos: 'EOS',
  tezos: 'XTZ',
  stellar: 'XML',
  monero: 'XMR',
  tron: 'TROY',
  'usd-coin': 'BTC',
  vechain: 'VET',
  neo: 'NEO',
  iota: 'MIOTA',
};

const getNews = async (id) => {
  return await axios.get('https://min-api.cryptocompare.com/data/v2/news/?categories=' + CRYPTOCOMPARE_ID_MAP[id], {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
};

const getSparkLine = async (id) => {
  return await axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${id}&tsym=USD&limit=12`);
};

module.exports = { getNews, getSparkLine, CRYPTOCOMPARE_ID_MAP };
