const mongoose = require('mongoose');

const remoteDbUrl = process.env.MONGODB_CONNECTION_URL;

mongoose
  .connect(remoteDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected succesfully');
  })
  .catch((error) => {
    console.log('error ' + error);
  });

module.exports = mongoose;
