const express = require('express');
const { set } = require('mongoose');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  getCars,
  setCars,
  updateCar,
  csvSetCars,
} = require('../controllers/carController');

router.route('/').get(protect, getCars).post(protect, setCars);

router.route('/:id').put(protect, updateCar);
router.route('/upload').post(protect, csvSetCars);

module.exports = router;
