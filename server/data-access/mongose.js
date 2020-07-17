const mongoose = require('mongoose');

const remoteDbUrl = 'mongodb+srv://dbUser:remik@cluster0.tvq44.mongodb.net/coin-market?retryWrites=true&w=majority';
const localDbUrl = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
mongoose
  .connect(localDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected succesfully');
  })
  .catch((error) => {
    console.log('error ' + error);
  });

module.exports = mongoose;
