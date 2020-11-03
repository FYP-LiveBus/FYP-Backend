const { Route, validate } = require("../../models/Route");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const routes = await Route.find()
    .select("-__v")
    .sort("name");
  res.send(routes);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let route = new Route({
    title: req.body.title,
    description: req.body.description,
    stops: req.body.stops,
    status: req.body.status
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
        title: req.body.title,
        description: req.body.description,
        stops: req.body.stops,
        status: req.body.status
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
