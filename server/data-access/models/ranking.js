const mongoose = require('../mongose');

const rankingSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  userId: mongoose.Types.ObjectId,
  email: { type: String, required: true },
  name: { type: String, required: true },
  totalPortfolioValue: { type: Number, required: true },
  change: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const Ranking = mongoose.model('ranking', rankingSchema);

module.exports = Ranking;
