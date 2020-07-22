const { Router } = require('express');
const transactionsController = require('../controller').transactionsController;
const router = Router();

router.post('/:userId', transactionsController.save);
router.get('/:userId', transactionsController.getList);

module.exports = router;
