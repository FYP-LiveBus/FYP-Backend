const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["student", "admin", "subadmin", "driver"]
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phonenumber: {
      type: String,
      required: false
    },
    city: {
      type: String,
    }
  },
  { timestamps: true }
));

exports.User = User;
// module.exports = model("users", User);
