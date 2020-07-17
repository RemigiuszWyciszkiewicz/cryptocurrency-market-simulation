const cryptoApi = require('../cryptocurrency-clients').coingeckoApi;

const getAll = async (res, req) => {
  try {
    const data = await cryptoApi.getAll();
    if (data.data) {
      res.res.send(data.data);
    }
  } catch (error) {
    res.res.send('Can not fetch coins list.');
  }
};

module.exports = { getAll };
