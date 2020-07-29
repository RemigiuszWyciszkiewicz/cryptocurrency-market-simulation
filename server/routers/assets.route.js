const { Router } = require('express');
const assetsController = require('../controller').assetsController;
const router = Router();

router.get('/:userId', assetsController.getAll);
router.get('/portforioSummary/:userId', assetsController.getPortfolioSummaryData);

module.exports = router;
