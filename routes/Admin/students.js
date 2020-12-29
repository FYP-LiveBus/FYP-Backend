const { Student, validate } = require("../../models/Student");
const User = require("../../models/User");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/:status", async (req, res) => {
  const students = await Student.find({status: req.params.status})
    .select("-__v")
    .sort("name");
  res.send(students);
});

router.get("/", async (req, res) => {
  const students = await Student.find({status: 'Accept'}).countDocuments()
  res.send(JSON.stringify(students));
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
      status: req.body.status
    },
    { new: true }
  );

  if (!student)
    return res
      .status(404)
      .send("The student with the given ID was not found.");

  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student)
    return res
      .status(404)
      .send("The student with the given ID was not found.");

  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).select("-__v");

  if (!student)
    return res
      .status(404)
      .send("The student with the given ID was not found.");

  res.send(student);
});

module.exports = router;
