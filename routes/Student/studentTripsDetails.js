const { StudentTripsDetail } = require("../../models/StudentTripsDetail");
// const auth = require("../middleware/auth");
// const {Location} = require("../../models/Stop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const trips = await StudentTripsDetail.find();
    res.send(trips);
});

router.get("/:id", async (req, res) => {
    const trip = await StudentTripsDetail.findById(req.params.id).select("-__v");
    if (!trip)
        return res
            .status(404)
            .send("The trip with the given ID was not found.");
    res.send(trip);
});

router.get("/count", async (req, res) => {
  const trips = await StudentTripsDetail.find().countDocuments({});
  res.send(trips);
});

router.post("/", async (req, res) => {
    let trip = new StudentTripsDetail({
        stdUsername: req.body.stdUsername,
        stdRegistrationNo: req.body.stdRegistrationNo,
        routeNo: req.body.routeNo,
        stopName: req.body.stopName,
        date: req.body.date
    });
    trip = await trip.save();

    res.send(trip);
});


router.delete("/:id", async (req, res) => {
    const trip = await StudentTripsDetail.findByIdAndRemove(req.params.id);
    if (!trip)
        return res
        .status(404)
     .send("The trip with the given ID was not found.");
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
