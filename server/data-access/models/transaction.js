const mongoose = require('../mongose');

const userSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  date: { type: String },
  amount: { type: String },
  cryptocurrency: { type: String, enum: [] },
  fafa: { type: String },
});
