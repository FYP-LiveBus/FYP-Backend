const { Route, validate } = require("../../models/Route");
// const auth = require("../middleware/auth");
const {Location} = require("../../models/Location");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const routes = await Route.find()
    .sort("title");
  res.send(routes);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let loc = [];
  req.body.stops.forEach(element => {
    var l = new Location({
        location_name: element.location_name,
        location_type: element.location_type,
        latitude: element.latitude,
        longitude: element.longitude,
        zip_code: element.zip_code,
        status: element.status,
    });
    loc.push(l);
  });

  console.log(loc)
  let route = new Route({
    routeNo: req.body.routeNo,
    routeName: req.body.routeName,
    startingPoint: req.body.startingPoint,
    stops: loc,
    status: req.body.status,
    // driver: req.body.driver
  });
  route = await route.save();

  res.send(route);
});

router.put("/:id", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const route = await Route.findByIdAndUpdate(
    req.params.id,
    {
      routeNo: req.body.routeNo,
      routeName: req.body.routeName,
      startingPoint: req.body.startingPoint,
      stops: req.body.stops,
      status: req.body.status,
      // driver: req.body.driver
    },
    { new: true }
  );

  if (!route)
    return res
      .status(404)
      .send("The route with the given ID was not found.");

  res.send(route);
});

router.delete("/:id", async (req, res) => {
  const route = await Route.findByIdAndRemove(req.params.id);

  if (!route)
    return res
      .status(404)
      .send("The route with the given ID was not found.");

  res.send(route);
});

router.get("/:id", async (req, res) => {
  const route = await Route.findById(req.params.id).select("-__v");

  if (!route)
    return res
      .status(404)
      .send("The route with the given ID was not found.");

  res.send(route);
});

module.exports = router;
