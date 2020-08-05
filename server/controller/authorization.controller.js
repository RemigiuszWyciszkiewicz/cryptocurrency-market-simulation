const passport = require('../auth').passport;
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../data-access').ErrorResponse;
const User = require('../data-access/models').User;
const axios = require('axios').default;
const Ranking = require('../data-access/models').Ranking;
const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY;

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

        return res.json({ token, ...getFixedUser(user) });
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

const recapchaTokenValidation = async (req, res, next) => {
  let token = req.body.token;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SERVER_KEY}&response=${token}&remoteip=${req.connection.remoteAddress}`;

  if (token === null || token === undefined) {
    res.status(201).send({ success: false, message: 'Token is empty or invalid' });
    return next();
  }

  axios
    .get(url)
    .then((response) => {
      if (!response.data.success) {
        res.send({ success: false, message: 'recaptcha failed' });
        return next();
      }

      res.send({ success: true, message: 'recaptcha passed' });
      return next();
    })
    .catch(console.log);
};

function getFixedUser(user) {
  const userFixed = user.toObject();
  delete userFixed.password;
  delete userFixed.assets;
  delete userFixed.transactions;
  return userFixed;
}

module.exports = {
  passportAuthenticateLogin,
  passportAuthenticateSignUp,
  recapchaTokenValidation,
};
