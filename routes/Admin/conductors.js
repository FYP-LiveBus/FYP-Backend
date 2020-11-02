const { Conductor, validate } = require("../../models/Conductor");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const conductors = await Conductor.find()
    .select("-__v")
    .sort("name");
  res.send(conductors);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let conductor = new Conductor({
    name: req.body.name,
    username: req.body.username,
    // email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });
  conductor = await conductor.save();

  res.send(conductor);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const conductor = await Conductor.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      username: req.body.username,
      // email: req.body.email,
      password: req.body.password,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!conductor)
    return res
      .status(404)
      .send("The conductor with the given ID was not found.");

  res.send(conductor);
});

router.delete("/:id", async (req, res) => {
  const conductor = await Conductor.findByIdAndRemove(req.params.id);

  if (!conductor)
    return res
      .status(404)
      .send("The conductor with the given ID was not found.");

  res.send(conductor);
});

router.get("/:id", async (req, res) => {
  const conductor = await conductor.findById(req.params.id).select("-__v");

  if (!Conductor)
    return res
      .status(404)
      .send("The conductor with the given ID was not found.");

  res.send(conductor);
});

module.exports = router;
