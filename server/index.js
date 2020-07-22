const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routers');
const _app_folder = 'server/dist/my-dream-app';
const passport = require('./auth').passport;
const { Router } = require('express');
const authorizationController = require('./controller').authorizationController;
const router = Router();

let PORT = process.env.PORT || 4100;

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/cryptocurrencies', passport.authenticate('jwt', { session: false }), routes.cryptocurrenciesRouter);
app.use('/api/assets', passport.authenticate('jwt', { session: false }), routes.assetsRouter);
app.use('/api/charts', passport.authenticate('jwt', { session: false }), routes.chartsRouter);
app.use('/api/transactions', passport.authenticate('jwt', { session: false }), routes.transactionsRouter);
app.use('/api/user', routes.authorizationRouter);
app.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  router.post('/tokenValidation/:userId', authorizationController.tokenValidation)
);
app.use('/api/news', routes.authorizationRouter);

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));

app.get('api/test', (req, res) => {
  res.send('HELLO WORLD');
});

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: _app_folder });
});

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

// ---- START UP THE NODE SERVER  ----
app.listen(PORT, function () {
  console.log('Node Express server for ' + app.name + ' listening on http://localhost:' + PORT);
});
