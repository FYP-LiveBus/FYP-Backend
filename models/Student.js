// const Joi = require('joi');
const mongoose = require('mongoose');

const Student = mongoose.model('Student', new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastname:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    
    required: true
  },
  password: { 
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  registrationNo:{
    type: String,
    required: true,
  },
  department:{
    type: String,
    required: true,
  }
}));

function validateStudent(student) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     username: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(50).email().required(),
//     password: Joi.string().min(8).max(50),
//     phone: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(student, schema);
}

exports.Student = Student; 
exports.validate = validateStudent;