const mongoose = require('mongoose');

const StudentTripsDetail = mongoose.model('StudentTripsDetail', new mongoose.Schema({
  stdUsername:{
    type: String,
    required: true,
  },
  stdRegistrationNo:{
    type: String,
    required: true
  },
  routeNo: {
    type: Number,
    required: true
  },
  stopName: {
    type: String,
    required: true,
  },
  date: { 
    type: String,
  }
}));

exports.StudentTripsDetail = StudentTripsDetail; 