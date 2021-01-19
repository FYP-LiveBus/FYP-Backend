const { Route, validate } = require("../../models/Route");
// const auth = require("../middleware/auth");
const { Location } = require("../../models/Stop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const routes = await Route.find().sort("title");
  res.send(routes);
});

router.get("/totalCount", async (req, res) => {
  const routes = await Route.find().countDocuments();
  res.send(JSON.stringify(routes));
});

router.get("/status/:status", async (req, res) => {
  const routes = await Route.find({ status: req.params.status });
  res.send(routes);
});

router.get("/:username", async (req, res) => {
  const routes = await Route.findOne({ driver: req.params.username });
  res.send(routes);
});

router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // console.log(req.body);
  let route = new Route({
    routeNo: req.body.routeNo,
    routeName: req.body.routeName,
    startingPoint: req.body.startingPoint,
    stops: req.body.stops,
    driver: req.body.driver,
    status: req.body.status,
    driverID: req.body.driverID,
    busNo: req.body.busNo,
  });

  route = await route.save();

  res.send(route);
});

router.put("/:id", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const route = await Route.findByIdAndUpdate(
    req.params.id,
    {
      routeNo: req.body.routeNo,
      routeName: req.body.routeName,
      startingPoint: req.body.startingPoint,
      stops: req.body.stops,
      driver: req.body.driver,
      status: req.body.status,
      driverID: req.body.driverID,
      busNo: req.body.busNo,
    },
    { new: true }
  );

  if (!route)
    return res.status(404).send("The route with the given ID was not found.");

  res.send(route);
});

router.delete("/:id", async (req, res) => {
  const route = await Route.findByIdAndRemove(req.params.id);

  if (!route)
    return res.status(404).send("The route with the given ID was not found.");

  res.send(route);
});

router.get("/:id", async (req, res) => {
  const route = await Route.findById(req.params.id).select("-__v");

  if (!route)
    return res.status(404).send("The route with the given ID was not found.");

  res.send(route);
});

module.exports = router;
