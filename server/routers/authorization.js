const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = Router();

// router.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => {
//   res.json({
//     message: 'Signup successful',
//     user: req.user,
//   });
// });

router.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    if (user) {
      res.send(user);
    }

    if (!user) {
      res.status(409).send('Duplication error');
    }
    if (err) {
      next(err);
    }
  })(req, res, next);
});

router.post('/signin', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(401).send('Wrong email or password');
        return next('Wrong email or password');
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, 'top_secret');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
