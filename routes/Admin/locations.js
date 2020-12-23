const { Location, validate } = require("../../models/Location");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find()
    .sort("title");
  res.send(locations);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = new Location({
    location_no: req.body.location_no,
    location_name: req.body.location_name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    status: req.body.status,
    routeNo: req.body.routeNo
  });
  location = await location.save();

  res.send(location);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
        location_no: req.body.location_no,
        location_name: req.body.location_name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        status: req.body.status,
        routeNo: req.body.routeNo
    },
    { new: true }
  );

  if (!location)
    return res
      .status(404)
      .send("The stop with the given ID was not found.");

  res.send(location);
});

router.delete("/:id", async (req, res) => {
  const location = await Location.findByIdAndRemove(req.params.id);

  if (!location)
    return res
      .status(404)
      .send("The location with the given ID was not found.");

  res.send(location);
});

router.get("/:id", async (req, res) => {
  const location = await Location.findById(req.params.id).select("-__v");

  if (!location)
    return res
      .status(404)
      .send("The stop with the given ID was not found.");

  res.send(location);
});

module.exports = router;
