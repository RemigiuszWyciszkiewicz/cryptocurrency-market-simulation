const { Router } = require('express');
const cryptoController = require('../controller').cryptoController;
const router = Router();

router.get('/list', cryptoController.getAll);
router.get('/details/:id', cryptoController.getDetails);
router.get('/news/:id', cryptoController.getNews);

module.exports = router;
