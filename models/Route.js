// const { array } = require('joi');
const mongoose = require('mongoose');
// const {stopSchema} = require("./Stop")

const Route = mongoose.model('Route', new mongoose.Schema({
  routeNo:{
    type: Number,
    required: true
  },
  routeName: {
    type: String,
    required: true,
  },
  startingPoint: {
    type: String,
    required: true,
  },
  stops: [{
    type: String
  }],
  driver:{
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'In-Active'],
    required: true
  },
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