const { Trip } = require("../../models/Trip");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const trips = await Trip.find().sort("title");
  res.send(trips);
});

router.get("/count", async (req, res) => {
  const trips = await Trip.find().countDocuments();
  res.send(JSON.stringify(trips));
});

router.get("/countForGraph", async (req, res) => {
  const trip = await Trip.aggregate([
    {
      $project: {
        _id: 0,
        // accountID:1,
        date: 1,
        PreviousDate: { $subtract: ["$date", 1000 * 60 * 60 * 24 * 30] },
      },
    },
    {
      $group: {
        _id: { _id: "$routeNo" },
        FDate: { $first: "$date" },
        LDate: { $first: "$PreviousDate" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");

  res.send(trip);
});

router.get("/:id", async (req, res) => {
  const trip = await Trip.findById(req.params.id).select("-__v");

  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");

  res.send(trip);
});

router.post("/", async (req, res) => {
  let trip = new Trip({
    driverName: req.body.driverName,
    routeNo: req.body.routeNo,
    busNo: req.body.busNo,
    startingPoint: req.body.startingPoint,
    endingPoint: req.body.endingPoint,
  });
  trip = await trip.save();

  res.send(trip);
});

module.exports = router;
