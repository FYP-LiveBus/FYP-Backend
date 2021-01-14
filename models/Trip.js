const mongoose = require("mongoose");

const Trip = mongoose.model(
  "Trip",
  new mongoose.Schema({
    driverName: {
      type: String,
      required: true,
    },
    routeNo: {
      type: Number,
      required: true,
    },
    busNo: {
      type: String,
      required: true,
    },
    startingPoint: {
      type: String,
      required: true,
    },
    endingPoint: {
      type: String,
      default: "Comsats University",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

exports.Trip = Trip;
