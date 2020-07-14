const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const cryptoRoute = require("./routers");
const User = require("./data-access/mongose").User;
const _app_folder = "server/dist/my-dream-app";
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require("passport");
let PORT = process.env.PORT || 4100;

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      console.log("login");
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromHeader("auth-token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use(
  "/api/cryptocurrencies",
  passport.authenticate("jwt", { session: false }),
  cryptoRoute.A_router
);
app.use("/api/wallet", cryptoRoute.A_router);
app.use("/api/user", cryptoRoute.B_router);
app.use("/api/news", cryptoRoute.A_router);

// ---- SERVE STATIC FILES ---- //
app.get("*.*", express.static(_app_folder, { maxAge: "1y" }));

app.get("api/test", (req, res) => {
  res.send("HELLO WORLD");
});

// ---- SERVE APLICATION PATHS ---- //
app.all("*", function (req, res) {
  res.status(200).sendFile(`/`, { root: _app_folder });
});

// app.use(function (err, req, res, next) {

//   res.status(err.status || 500);
//   res.json({ error: err });
// });

// ---- START UP THE NODE SERVER  ----
app.listen(PORT, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      PORT
  );
});
