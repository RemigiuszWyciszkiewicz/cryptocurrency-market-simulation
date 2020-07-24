const { Router } = require('express');
const chartsController = require('../controller').chartsController;
const router = Router();

router.get('/donut/:userId', chartsController.getDonutData);
router.get('/linear/cryptocurrency-details/:cryptoId', chartsController.getCryptocurrencyLinearChartData);

module.exports = router;
