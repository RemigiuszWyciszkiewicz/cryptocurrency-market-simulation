const getFixedUser = (user) => {
  const userFixed = user.toObject();
  delete userFixed.password;
  delete userFixed.assets;
  delete userFixed.transactions;
  return userFixed;
};

module.exports = { getFixedUser };
