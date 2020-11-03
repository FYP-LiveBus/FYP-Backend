const { Driver, validate } = require("../../models/Driver");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const drivers = await Driver.find()
    .select("-__v")
    .sort("name");
  res.send(drivers);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let driver = new Driver({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });
  driver = await driver.save();

  res.send(driver);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!driver)
    return res
      .status(404)
      .send("The driver with the given ID was not found.");

  res.send(driver);
});

router.delete("/:id", async (req, res) => {
  const driver = await Driver.findByIdAndRemove(req.params.id);

  if (!driver)
    return res
      .status(404)
      .send("The driver with the given ID was not found.");

  res.send(driver);
});

router.get("/:id", async (req, res) => {
  const driver = await Driver.findById(req.params.id).select("-__v");

  if (!driver)
    return res
      .status(404)
      .send("The driver with the given ID was not found.");

  res.send(driver);
});

module.exports = router;
