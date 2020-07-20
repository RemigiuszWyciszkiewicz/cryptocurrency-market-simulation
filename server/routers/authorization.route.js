const { Router } = require('express');
const authorizationController = require('../controller').authorizationController;
const router = Router();

router.post('/signup', authorizationController.passportAuthenticateSignUp);
router.post('/signin', authorizationController.passportAuthenticateLogin);

module.exports = router;
