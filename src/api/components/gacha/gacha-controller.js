const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function executeGacha(request, response, next) {
  try {
    const { userId, userName } = request.body;
    if (!userId || !userName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'userId dan userName wajib diisi'
      );
    }
    const result = await gachaService.executeGacha(userId, userName);
    const isWin = result.reward !== 'Zonk';
    return response.status(200).json({
      message: isWin ? 'Selamat! Anda menang!' : 'Anda kurang beruntung!',
      prize: result.reward,
      at: result.createdAt,
    });
  } catch (error) {
    if (error.message === 'DAILY_LIMIT_REACHED') {
      return next(
        errorResponder(
          errorTypes.FORBIDDEN,
          'Batas harian sudah tercapai. Maksimal 5 kali gacha per hari, coba lagi besok.'
        )
      );
    }
    return next(error);
  }
}

async function createPrize(request, response, next) {
  try {
    const { name, quota } = request.body;
    const prize = await gachaService.createPrize(name, quota);
    return response.status(201).json(prize);
  } catch (error) {
    return next(error);
  }
}

async function getUserHistory(request, response, next) {
  try {
    const { userId } = request.params;
    const history = await gachaService.getUserHistory(userId);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getPrizeInventory(request, response, next) {
  try {
    const inventory = await gachaService.getPrizeInventory();
    return response.status(200).json(inventory);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getMaskedWinners();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  executeGacha,
  createPrize,
  getUserHistory,
  getPrizeInventory,
  getWinners,
};
