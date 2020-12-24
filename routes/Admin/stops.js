const { Stop, validate } = require("../../models/Stop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stops = await Stop.find();
  res.send(stops);
});

router.post("/", async (req, res) => {
  // const error  = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let stop = new Stop({
    stopNo: req.body.stopNo,
    stopName: req.body.stopName,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    status: req.body.status,
  });
  stop = await stop.save();

  res.send(stop);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const stop = await Stop.findByIdAndUpdate(
    req.params.id,
    {
      stopNo: req.body.stopNo,
      stopName: req.body.stopName,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      status: req.body.status,
    },
    { new: true }
  );

  if (!stop)
    return res
      .status(404)
      .send("The stop with the given ID was not found.");

  res.send(stop);
});

router.delete("/:id", async (req, res) => {
  const stop = await Stop.findByIdAndRemove(req.params.id);

  if (!stop)
    return res
      .status(404)
      .send("The stop with the given ID was not found.");

  res.send(stop);
});

router.get("/:id", async (req, res) => {
  const stop = await Stop.findById(req.params.id).select("-__v");

  if (!stop)
    return res
      .status(404)
      .send("The stop with the given ID was not found.");

  res.send(stop);
});

module.exports = router;
