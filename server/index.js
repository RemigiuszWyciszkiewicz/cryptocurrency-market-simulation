const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const _port = 4100;
const _app_folder = "dist/my-dream-app";

const app = express();
app.use(compression());
app.use(cors());

// ---- SERVE STATIC FILES ---- //
app.get("*.*", express.static(_app_folder, { maxAge: "1y" }));

app.use((req, res, next) => {
  if (req.url === "/api/test") {
    res.send({ dupa: "jeża", age: 22 });
  } else {
    next();
  }
});

app.get("api/test", (req, res) => {
  console.log("api/test " + req.url);
  res.send("HELLO WORLD");
});

// ---- SERVE APLICATION PATHS ---- //
app.all("*", function (req, res) {
  console.log("app.all", req.url);
  res.status(200).sendFile(`/`, { root: _app_folder });
});

// // ---- SERVE STATIC FILES ---- //
// app.get("*.*", function (req, res) {
//   console.log(req.url);
//   express.static(_app_folder, { maxAge: "0" });
// });

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      _port
  );
});
