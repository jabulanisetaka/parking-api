const express = require('express');
const { set } = require('mongoose');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  getParkingLot,
  setParkingLot,
} = require('../controllers/parkingLotController');

router.route('/').get(getParkingLot).post(protect, setParkingLot);

module.exports = router;
