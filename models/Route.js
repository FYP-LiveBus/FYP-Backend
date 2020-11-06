// const { array } = require('joi');
const mongoose = require('mongoose');
const {locationSchema} = require("../models/Location")

const Route = mongoose.model('Route', new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
  },
  stops: [
      locationSchema
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  }
}));

function validateRoute(route) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     username: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(50).email().required(),
//     password: Joi.string().min(8).max(50),
//     phone: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(bus, schema);
}

exports.Route = Route; 
exports.validate = validateRoute;