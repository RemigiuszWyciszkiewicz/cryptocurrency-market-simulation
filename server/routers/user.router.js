const { Router } = require('express');

const userController = require('../controller').userController;
const router = Router();

router.put('accountReset/:userId', userController.resetAccount);
router.post('/tokenValidation/:userId', userController.tokenValidation);

module.exports = router;
