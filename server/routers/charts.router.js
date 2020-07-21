const { Router } = require('express');
const chartsController = require('../controller').chartsController;
const router = Router();

router.get('/donut/:userId', chartsController.getDonutData);

module.exports = router;
