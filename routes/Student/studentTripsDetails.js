const { StudentTripsDetail } = require("../../models/StudentTripsDetail");
// const auth = require("../middleware/auth");
// const {Location} = require("../../models/Stop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const trips = await StudentTripsDetail.find();
  res.send(trips);
});

router.get("/count", async (req, res) => {
  const trips = await StudentTripsDetail.find().countDocuments();
  res.send(JSON.stringify(trips));
});

router.get("/countForGraph", async (req, res) => {
  const trip = await StudentTripsDetail.aggregate([
    {
      $group: {
        _id: "$routeNo",
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);

  // var d = new Date();
  // d.setDate(d.getDate() - 7);

  // const trip = await StudentTripsDetail.aggregate([
  //   // Only include the docs that have at least one passedModules element
  //   // that passes the filter.
  //   { $match: { date: { $gt: d } } },
  //   // Duplicate the docs, one per passedModules element
  //   { $unwind: "$trip" },
  //   // Filter again to remove the non-matching elements
  //   { $match: { date: { $gt: d } } },
  // ]);

  // const trip = await StudentTripsDetail.aggregate([
  //   {
  //     $project: {
  //       _id: 1,
  //       // accountID:1,
  //       date: 1,
  //       PreviousDate: { $subtract: ["$date", 1000 * 60 * 60 * 24 * 7] },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: { _id: "$routeNo" },
  //       FDate: { $first: "$date" },
  //       LDate: { $first: "$PreviousDate" },
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]);

  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");

  res.send(JSON.stringify(trip));
});

router.get("/:email", async (req, res) => {
  const trip = await StudentTripsDetail.find({ email: req.params.email });
  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");
  res.send(trip);
});

router.post("/", async (req, res) => {
  let trip = new StudentTripsDetail({
    stdUsername: req.body.stdUsername,
    email: req.body.email,
    routeNo: req.body.routeNo,
    stopName: req.body.stopName,
    driver: req.body.driver,
    date: req.body.date,
  });
  trip = await trip.save();

  res.send(trip);
});

router.delete("/:id", async (req, res) => {
  const trip = await StudentTripsDetail.findByIdAndRemove(req.params.id);
  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");
  res.send(trip);
});

// router.put("/:id", async (req, res) => {
//   const error  = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const route = await Route.findByIdAndUpdate(
//     req.params.id,
//     {
//       routeNo: req.body.routeNo,
//       routeName: req.body.routeName,
//       startingPoint: req.body.startingPoint,
//       stops: req.body.stops,
//       driver: req.body.driver,
//       status: req.body.status,
//     },
//     { new: true }
//   );

//   if (!route)
//     return res
//       .status(404)
//       .send("The route with the given ID was not found.");

//   res.send(route);
// });

// router.delete("/:id", async (req, res) => {
//   const route = await Route.findByIdAndRemove(req.params.id);

//   if (!route)
//     return res
//       .status(404)
//       .send("The route with the given ID was not found.");

//   res.send(route);
// });

module.exports = router;
