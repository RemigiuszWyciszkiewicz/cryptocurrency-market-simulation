const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const cryptoRoute = require("./routers");

const _app_folder = "server/dist/my-dream-app";

let PORT = process.env.PORT || 4100;

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/cryptocurrencies", cryptoRoute.A_router);
app.use("/api/wallet", cryptoRoute.A_router);
app.use("/api/news", cryptoRoute.A_router);
app.use("/api/user", cryptoRoute.A_router);

// ---- SERVE STATIC FILES ---- //
app.get("*.*", express.static(_app_folder, { maxAge: "1y" }));

// app.use((req, res, next) => {
//   if (req.url === "/api/test") {
//     res.send({ dupa: "jeża", age: 22 });
//   } else {
//     next();
//   }
// });

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
app.listen(PORT, function () {
  console.log(
    "Node Express server for " +
      app.name +
      " listening on http://localhost:" +
      PORT
  );
});
