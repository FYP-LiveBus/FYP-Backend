// const Joi = require('joi');
const mongoose = require("mongoose");

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
    },
  })
);

exports.Notification = Notification;
