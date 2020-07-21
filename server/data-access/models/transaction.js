const mongoose = require('../mongose');
const SUPPORTED_CRYPTOCURRENCIES = require('../../cryptocurrency-clients').SUPPORTED_CRYPTOCURRENCIES;

const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  value: { type: Number },
  price: { type: Number, required: true },
  cryptocurrency: { type: String, enum: SUPPORTED_CRYPTOCURRENCIES, required: true },
  type: { type: String, enum: ['sale', 'purchase'], required: true },
  user: { type: Schema.ObjectId, ref: 'users' },
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
