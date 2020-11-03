const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
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
    }
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
