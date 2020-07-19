const { Router } = require('express');
const authorizationController = require('../controller').authorizationController;
const router = Router();

// router.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => {
//   res.json({
//     message: 'Signup successful',
//     user: req.user,
//   });
// });

router.post('/signup', authorizationController.passportAuthenticateSignUp);
router.post('/signin', authorizationController.passportAuthenticateLogin);

module.exports = router;
