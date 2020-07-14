const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const url =
  "mongodb+srv://dbUser:remik@cluster0.tvq44.mongodb.net/coin-market?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected succesfully");
  })
  .catch((error) => {
    console.log("error " + error);
  });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("users", userSchema);
// new User({
//   email: "remigiudafsz@wp.pl",
//   password: "fwafafa",
// }).save();
module.exports.User = User;
