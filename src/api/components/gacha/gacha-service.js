const gachaRepository = require('./gacha-repository');

async function executeGacha(userId, userName) {
  const todayCount = await gachaRepository.countUserGachaToday(userId);
  if (todayCount >= 5) {
    throw new Error('DAILY_LIMIT_REACHED');
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();

  let wonPrize = null;

  const winChance = Math.random();
  if (winChance <= 0.3 && availablePrizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const candidatePrize = availablePrizes[randomIndex];

    wonPrize = await gachaRepository.claimPrize(candidatePrize._id);
  }

  const log = await gachaRepository.createGachaLog(
    userId,
    userName,
    wonPrize ? wonPrize._id : null,
    wonPrize ? wonPrize.name : 'Zonk'
  );

  return log;
}

async function createPrize(name, quota) {
  return gachaRepository.createPrize(name, quota);
}

async function getUserHistory(userId) {
  return gachaRepository.getGachaHistory(userId);
}

async function getPrizeInventory() {
  const prizes = await gachaRepository.getPrizes();

  return prizes.map((p) => ({
    hadiah: p.name,
    kuota_tersedia: (p.quota || 0) - (p.claimed || 0),
  }));
}

async function getMaskedWinners() {
  const winners = await gachaRepository.getAllWinners();

  return winners.map((w) => {
    const name = w.userName;
    const maskedName = name
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' ';
        if (index === 0) return char;
        return Math.random() > 0.5 ? char : '*';
      })
      .join('');

    return {
      name: maskedName,
      prize: w.reward,
      date: w.createdAt,
    };
  });
}

module.exports = {
  executeGacha,
  createPrize,
  getUserHistory,
  getPrizeInventory,
  getMaskedWinners,
};
