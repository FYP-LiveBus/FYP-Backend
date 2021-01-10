const mongoose = require("mongoose");

const Bus = mongoose.model(
  "Bus",
  new mongoose.Schema({
    busNo: {
      type: String,
      required: true,
    },
    busModel: {
      type: String,
      // required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["manual", "auto"],
      required: true,
    },
  })
);

function validateBus(bus) {
  //   const schema = {
  //     name: Joi.string().min(5).max(50).required(),
  //     username: Joi.string().min(5).max(50).required(),
  //     email: Joi.string().min(5).max(50).email().required(),
  //     password: Joi.string().min(8).max(50),
  //     phone: Joi.string().min(5).max(50).required()
  //   };
  //   return Joi.validate(bus, schema);
}

exports.Bus = Bus;
exports.validate = validateBus;
