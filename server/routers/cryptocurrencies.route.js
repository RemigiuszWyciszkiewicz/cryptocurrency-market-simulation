const { Router } = require('express');
const cryptoController = require('../controller').cryptoController;
const router = Router();
const cryptocurrenciesService = require('../services').cryptocurennciesService;

router.get('/list', cryptoController.getAll);

module.exports = router;
