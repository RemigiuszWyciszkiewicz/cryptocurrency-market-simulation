const tokenValidation = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const userRank = await Ranking.find({ _id: user._id }).select({ rank: 1 });
    res.send({ ...getFixedUser(user), userRank: userRank[0].rank });
    return next();
  } catch (error) {
    res.status(404).send(new ErrorResponse('tokenValidityError', error.message));
  }
};

const resetAccount = async (req, res, next) => {};
module.exports = { resetAccount, tokenValidation };
