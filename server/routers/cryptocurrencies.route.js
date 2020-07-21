const { Router } = require('express');
const cryptoController = require('../controller').cryptoController;
const router = Router();

router.get('/list', cryptoController.getAll);

module.exports = router;
