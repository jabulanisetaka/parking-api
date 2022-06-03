const asyncHandler = require('express-async-handler');
const ParkingLot = require('../model/parkingLotModel');
const User = require('../model/userModel');

// @desc  GET parking lots
//@ROUTE GET /api/parkinglots
//@access public
const getParkingLot = asyncHandler(async (req, res) => {
  const parkingLot = await ParkingLot.find();
  res.status(200).json(parkingLot);
});

// @desc  POST parking lots
//@ROUTE POST /api/parkinglots
//@access private
const setParkingLot = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = await User.findById(req.user.id);

  if (!req.body.parkinglotname) {
    res.status(400);
    throw new Error('Please add a parking lot');
  }

  if (isAdmin) {
    const parkingLot = await ParkingLot.create({
      parkinglotname: req.body.parkinglotname,
      user: req.user.id,
    });
    res.status(200).json(parkingLot);
  } else {
    res.status(400);
    throw new Error('User not admin');
  }
});

module.exports = {
  getParkingLot,
  setParkingLot,
};
