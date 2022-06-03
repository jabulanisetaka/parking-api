const mongoose = require('mongoose');

const parkingLotSchema = mongoose.Schema(
  {
    parkinglotname: {
      type: String,
      required: [true, 'please add parking lot'],
      unique: true,
    },
    // isUsed: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
