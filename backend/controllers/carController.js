const asyncHandler = require('express-async-handler');
const Car = require('../model/carModel');
const ParkingLot = require('../model/parkingLotModel');
const User = require('../model/userModel');
const multer = require('multer');
const csv = require('csvtojson');
const path = require('path');
const csvFile =
  'C:/Users/JabulaniSetaka/Documents/parking-app/backend/data.csv';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// @desc  GET cars
//@ROUTE GET /api/cars
//@access private
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({
    user: req.user.id,
  });

  res.status(200).json(cars);
});

// @desc  Post cars
//@ROUTE POST /api/parkinglots/cars
//@access private
const setCars = asyncHandler(async (req, res) => {
  if (!req.body.carBrand) {
    res.status(400);
    throw new Error('Please add car brand');
  }
  if (!req.body.licensePlate) {
    res.status(400);
    throw new Error('Please add license plate');
  }
  const car = await Car.create({
    licensePlate: req.body.licensePlate,
    carBrand: req.body.carBrand,
    user: req.user.id,
    parkinglotId: req.body.parkinglotId,
  });
  res.status(200).json(car);
});

// @desc  PUT parking lots
//@ROUTE PUT /api/parkinglots
//@access private
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(400);
    throw new Error(' Car not found');
  }
  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // check sure the logged in users matches the car user
  if (car.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCar);
});

// @desc  POST parking lots
//@ROUTE POST /api/parkinglots/cars/upload
//@access private
const csvSetCars =
  (uploads.single('csv'),
  (req, res) => {
    csv()
      .fromFile(csvFile)
      .then((jsonObj) => {
        console.log(jsonObj);
        for (var x = 0; x < jsonObj; x++) {
          temp = parseFloat(jsonObj[x].carBrand);
          jsonObj[x].carBrand = temp;
          temp = parseFloat(jsonObj[x].licensePlate);
          jsonObj[x].licensePlate = temp;
          temp = parseFloat(jsonObj[x].parkinglotId);
          jsonObj[x].parkinglotId = temp;
          temp = parseFloat(jsonObj[x].timeParkedAt);
          jsonObj[x].timeParkedAt = temp;
        }
        Car.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(data);
          }
        });
      });
  });

module.exports = {
  getCars,
  setCars,
  updateCar,
  csvSetCars,
};
