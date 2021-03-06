// const Joi = require('joi');
const mongoose = require('mongoose');

const Conductor = mongoose.model('Conductor', new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  age:{
    type: Number,
  },
  city:{
    type: String,
    required: true,
  },
  profilePicture:{
    type: String,
  }
}));

function validateConductor(conductor) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     username: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(50).email().required(),
//     password: Joi.string().min(8).max(50),
//     phone: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(conductor, schema);
}

exports.Conductor = Conductor; 
exports.validate = validateConductor;