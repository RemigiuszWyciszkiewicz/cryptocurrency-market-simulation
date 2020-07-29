const { Router } = require('express');
const rankingController = require('../controller').rankingController;
const router = Router();

router.get('/list', rankingController.getRanking);
router.get('/:userId', rankingController.getUserRankingInformation);

module.exports = router;
