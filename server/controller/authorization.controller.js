const passport = require('../auth').passport;
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../data-access').ErrorResponse;

const passportAuthenticateLogin = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(401).send(new ErrorResponse('authorizationError', 'Wrong email or password'));
        return next('Wrong email or password');
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, 'top_secret');

        return res.json({ token, ...user.toObject() });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const passportAuthenticateSignUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    if (info && info.nameDuplication) {
      res.status(409).send(new ErrorResponse('emailDuplication', info.nameDuplication));
    }

    if (info && info.emailDuplication) {
      res.status(409).send(new ErrorResponse('emailDuplication', info.emailDuplication));
    }
    if (user) {
      res.send(user);
    }

    if (err) {
      next(err);
    }
  })(req, res, next);
};

const tokenValidation = async (req, res, next) => {
  res.send({ isJwtValid: true });
};

module.exports = {
  passportAuthenticateLogin,
  passportAuthenticateSignUp,
  tokenValidation,
};
