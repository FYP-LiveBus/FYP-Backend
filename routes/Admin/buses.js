const { Bus, validate } = require("../../models/Bus");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const buses = await Bus.find()
    .select("-__v")
    .sort("name");
  res.send(buses);
});

router.get("/getTotal", async (req, res) => {
  const buses = await Bus.find().countDocuments();
  res.send(JSON.stringify(buses));
});


router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bus = new Bus({
    busNo: req.body.busNo,
    busModel: req.body.busModel,
    modelYear: req.body.modelYear,
    manufacturer: req.body.manufacturer,
    transmission: req.body.transmission
  });
  bus = await bus.save();

  res.send(bus);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bus = await Bus.findByIdAndUpdate(
    req.params.id,
    {
      busNo: req.body.busNo,
      busModel: req.body.busModel,
      modelYear: req.body.modelYear,
      manufacturer: req.body.manufacturer,
      transmission: req.body.transmission
    },
    { new: true }
  );

  if (!bus)
    return res
      .status(404)
      .send("The bus with the given ID was not found.");

  res.send(bus);
});

router.delete("/:id", async (req, res) => {
  const bus = await Bus.findByIdAndRemove(req.params.id);

  if (!bus)
    return res
      .status(404)
      .send("The bus with the given ID was not found.");

  res.send(bus);
});

router.get("/:id", async (req, res) => {
  const bus = await Bus.findById(req.params.id).select("-__v");

  if (!bus)
    return res
      .status(404)
      .send("The bus with the given ID was not found.");

  res.send(bus);
});

module.exports = router;
