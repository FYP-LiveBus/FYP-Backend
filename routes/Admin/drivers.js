const { Driver, validate } = require("../../models/Driver");
const User = require("../../models/User");
// const auth = require("../middleware/auth");
const express = require("express");
const { userRegister } = require("../../utils/Auth");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res) => {
  const drivers = await Driver.find().select("-__v").sort("name");
  res.send(drivers);
});

router.get("/getTotal", async (req, res) => {
  const drivers = await Driver.find().countDocuments();
  res.send(JSON.stringify(drivers));
});

router.post("/", async (req, res) => {
  // const error  = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log(req.body)

  // Validate the username
  // let usernameNotTaken = await validateUsername(req.body.username);
  // if (!usernameNotTaken) {
  //   return res.status(400).json({
  //     message: `Username is already taken.`,
  //     success: false,
  //   });
  // }

  // validate the email
  let emailNotRegistered = await validateEmail(req.body.email);
  if (!emailNotRegistered) {
    return res.status(400).json({
      message: `Email is already registered.`,
      success: false,
    });
  }

  // Get the hashed password
  const password = await bcrypt.hash(req.body.password, 12);
  // create a new user

  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: "driver",
    username: req.body.username,
    password: password,
    phonenumber: req.body.phone,
    city: req.body.city,
  });

  newUser = await newUser.save();

  let driver = new Driver({
    driverID: newUser._id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    licensenumber: req.body.licensenumber,
    age: req.body.age,
    city: req.body.city,
    profilePicture: req.body.profilePicture,
    email: req.body.email,
  });

  driver = await driver.save();

  // console.log(driver)
  res.send(driver);
});

router.put("/:id", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      licensenumber: req.body.licensenumber,
      age: req.body.age,
      city: req.body.city,
      profilePicture: req.body.profilePicture,
    },
    { new: true }
  );

  if (!driver)
    return res.status(404).send("The driver with the given ID was not found.");

  res.send(driver);
});

router.delete("/:id", async (req, res) => {
  // let e = await Driver.find(req.params.id);
  const driver = await Driver.findByIdAndRemove(req.params.id);
  if (!driver)
    return res.status(404).send("The driver with the given ID was not found.");

  const user = await User.findOneAndRemove({ email: driver.email });
  if (!driver && !user)
    return res.status(404).send("The student with the given ID was not found.");

  // res.send(user);
  res.send(driver);
});

router.get("/:id", async (req, res) => {
  const driver = await Driver.findById(req.params.id).select("-__v");

  if (!driver)
    return res.status(404).send("The driver with the given ID was not found.");

  res.send(driver);
});

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = router;
