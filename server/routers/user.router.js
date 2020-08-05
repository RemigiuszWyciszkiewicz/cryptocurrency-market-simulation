const { Router } = require('express');

const userController = require('../controller').userController;
const router = Router();

router.put('/:userId', userController.resetAccount);
router.get('/:userId', userController.tokenValidation);

module.exports = router;
