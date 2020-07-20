const { Router } = require('express');
const assetsController = require('../controller').assetsController;
const router = Router();

router.post('/:userId', assetsController.save);
router.get('/:userId', assetsController.getAll);

module.exports = router;
