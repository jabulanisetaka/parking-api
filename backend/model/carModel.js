const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
  {
    parkinglotId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ParkingLot',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
    carBrand: {
      type: String,
      required: [true, 'please add car brand'],
    },
    licensePlate: {
      type: String,
      required: [true, 'please add License plate'],
      unique: true,
    },
    parked: {
      type: Boolean,
      default: true,
    },

    timeParkedAt: {
      type: Date,
      default: Date.now,
    },
    value: {
      type: Number,
    },
    discountCents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Car', carSchema);
