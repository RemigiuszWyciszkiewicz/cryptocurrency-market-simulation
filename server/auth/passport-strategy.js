const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../data-access/models').User;
const Ranking = require('../data-access/models').Ranking;
const bcrypt = require('bcrypt');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const documentsCountWithGivenEmails = await User.find({ email: req.body.email }).countDocuments().exec();
        const documentsCountWithGivenNames = await User.find({ name: req.body.name }).countDocuments().exec();

        if (documentsCountWithGivenEmails !== 0) {
          return done(null, false, { emailDuplication: 'User with given email already exists.' });
        } else if (documentsCountWithGivenNames !== 0) {
          return done(null, false, { nameDuplication: 'User with given name already exists.' });
        } else {
          req.body.password = await bcrypt.hash(password, 10);
          const documnetCount = await Ranking.count();
          const user = await User.create({ email, ...req.body, usd: 50000, lastLogin: new Date().toISOString() });
          await addNewUserToRanking(user, documnetCount);
          console.log(user);
          console.log('documnetCount', documnetCount);

          return done(null, { email, ...req.body, lastLogin: new Date().toISOString(), usd: 50000 });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOneAndUpdate({ email }, { lastLogin: new Date().toISOString() }, { new: true });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromHeader('auth-token'),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

async function addNewUserToRanking(user, documnetCount) {
  await Ranking.create({
    _id: user._id,
    email: user.email,
    name: user.name,
    totalPortfolioValue: 50000,
    change: 0,
    rank: documnetCount + 1,
  });
}

module.exports = passport;
