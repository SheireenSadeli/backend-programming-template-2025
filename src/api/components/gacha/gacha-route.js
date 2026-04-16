const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/', gachaController.executeGacha);

  // Menambahkan daftar hadiah
  route.post('/admin/prizes', gachaController.createPrize);

  // Mengetahui histori gacha yang sudah dilakukan
  route.get('/history/:userId', gachaController.getUserHistory);

  // Menampilkan daftar hadiah dan sisa kuota yang tersedia
  route.get('/prizes', gachaController.getPrizeInventory);

  // Menampilkan daftar user yang menang dengan nama yang sudah disamarkan
  route.get('/winners', gachaController.getWinners);
};
