const mongoose = require('../mongose');
const bcrypt = require('bcrypt');

const Transaction = require('../models/transaction');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'transactions' }],
});

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('users', userSchema);

module.exports.User = User;
module.exports.Transaction = Transaction;
