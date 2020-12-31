// const Joi = require('joi');
const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  message:{
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
//   studentID:{
//     type: String,
//     required: true
//   },
  created_at: {
    type: Date,
  }
}));

exports.Feedback = Feedback; 
