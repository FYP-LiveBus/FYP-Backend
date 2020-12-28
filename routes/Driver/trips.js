const { Trip } = require("../../models/Trip");
// const auth = require("../middleware/auth");
const {Location} = require("../../models/Stop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const trips = await Trip.find()
    .sort("title");
  res.send(trips);
});

// router.get("/:username", async (req, res) => {
//   const routes = await Route.findOne({driver: req.params.username})
//   res.send(routes);
// });

router.post("/", async (req, res) => {

  let trip = new Trip({
    driverName: req.body.driverName,
    routeNo: req.body.routeNo,
    startingPoint: req.body.startingPoint,
    endingPoint: req.body.endingPoint,
  });
  trip = await trip.save();

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

router.get("/:id", async (req, res) => {
  const trip = await Trip.findById(req.params.id).select("-__v");

  if (!trip)
    return res
      .status(404)
      .send("The trip with the given ID was not found.");

  res.send(trip);
});

module.exports = router;
