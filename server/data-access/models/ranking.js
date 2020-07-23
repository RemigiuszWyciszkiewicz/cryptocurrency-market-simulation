const mongoose = require('../mongose');

const rankingSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  userId: mongoose.Types.ObjectId,
  value: { type: Number, required: true },
  change: { type: Number, required: true },
  assetDominance: { type: Number, required: true },
});

const Ranking = mongoose.model('ranking', rankingSchema);

module.exports = Ranking;
