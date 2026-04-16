const { Prizes, GachaLogs } = require('../../../models');

async function getPrizes() {
  return Prizes.find({}).lean();
}

async function getAvailablePrizes() {
  return Prizes.find({ $expr: { $lt: ['$claimed', '$quota'] } });
}

async function claimPrize(prizeId) {
  return Prizes.findOneAndUpdate(
    { _id: prizeId, $expr: { $lt: ['$claimed', '$quota'] } },
    { $inc: { claimed: 1 } },
    { new: true }
  );
}

async function createPrize(name, quota) {
  return Prizes.create({
    name,
    quota,
    claimed: 0,
  });
}

async function createGachaLog(userId, userName, prizeId, prizeName) {
  return GachaLogs.create({
    userId,
    userName,
    prizeId,
    reward: prizeName,
  });
}

async function countUserGachaToday(userId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return GachaLogs.countDocuments({
    userId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });
}

async function getGachaHistory(userId) {
  return GachaLogs.find({ userId }).sort({ createdAt: -1 });
}

async function getAllWinners() {
  return GachaLogs.find({ prizeId: { $ne: null } })
    .select('userName reward createdAt')
    .sort({ createdAt: -1 });
}

module.exports = {
  getPrizes,
  getAvailablePrizes,
  claimPrize,
  createPrize,
  createGachaLog,
  countUserGachaToday,
  getGachaHistory,
  getAllWinners,
};
