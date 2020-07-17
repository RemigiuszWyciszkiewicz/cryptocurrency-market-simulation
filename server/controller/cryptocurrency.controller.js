const cryptoApi = require("../cryptocurrency-clients").coingeckoApi;

const getAll = async (res, req) => {
    const data = await cryptoApi.getAll();

    res.res.send(data.data);
};

module.exports = { getAll };
