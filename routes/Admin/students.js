const { Student, validate } = require("../../models/Student");
const User = require("../../models/User");
// const auth = require("../middleware/auth");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find({ status: "Accept" }).countDocuments();
  res.send(JSON.stringify(students));
});

router.get("/count", async (req, res) => {
  const totalAccept = await Student.find({ status: "Accept" }).countDocuments();
  const totalPending = await Student.find({
    status: "Pending",
  }).countDocuments();
  const std = { totalAccept, totalPending };
  res.send(std);
});

router.get("/countAll", async (req, res) => {
  const stds = await Student.find().countDocuments();
  res.sendStatus(JSON.stringify(stds));
});

// router.get("/:status", async (req, res) => {
//   const students = await Student.find({ status: req.params.status })
//     .select("-__v")
//     .sort("name");
//   res.send(students);
// });

router.post("/", async (req, res) => {
  // Validate the username
  let usernameNotTaken = await validateUsername(req.body.username);
  if (!usernameNotTaken) {
    return res.status(400).json({
      message: `Username is already taken.`,
      success: false,
    });
  }

  // validate the email
  let emailNotRegistered = await validateEmail(req.body.email);
  if (!emailNotRegistered) {
    return res.status(400).json({
      message: `Email is already registered.`,
      success: false,
    });
  }

  let student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    semester: req.body.semester,
    phone: req.body.phone,
    registrationNo: req.body.registrationNo,
    department: req.body.department,
  });

  student = await student.save();

  res.send(student);
});

router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      semester: req.body.semester,
      phone: req.body.phone,
      registrationNo: req.body.registrationNo,
      department: req.body.department,
      status: req.body.status,
    },
    { new: true }
  );

  if (!student)
    return res.status(404).send("The student with the given ID was not found.");
  else {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(student);
    } else {
      // Get the hashed password
      const password = await bcrypt.hash(req.body.password, 12);
      // create a new user

      let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: "student",
        username: req.body.username,
        password: password,
        phonenumber: req.body.phone,
      });

      newUser = await newUser.save();
      res.send(student);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (student.status === "Pending") {
    res.send(student);
  }
  const user = await User.findOneAndRemove({ email: student.email });
  if (!student || !user)
    return res.status(404).send("The student with the given ID was not found.");

  res.send(user);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).select("-__v");

  if (!student)
    return res.status(404).send("The student with the given ID was not found.");

  res.send(student);
});

const validateUsername = async (username) => {
  let user = await Student.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await Student.findOne({ email });
  return user ? false : true;
};

module.exports = router;
