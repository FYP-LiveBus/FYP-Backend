const mongoose = require("mongoose");

const StudentTripsDetail = mongoose.model(
  "StudentTripsDetail",
  new mongoose.Schema({
    stdUsername: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    routeNo: {
      type: Number,
      required: true,
    },
    stopName: {
      type: String,
      required: true,
    },
    driver: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

exports.StudentTripsDetail = StudentTripsDetail;
