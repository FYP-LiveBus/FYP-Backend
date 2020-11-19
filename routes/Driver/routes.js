const router = require("express").Router();
const { serializeUser } = require("../../utils/Auth");
const { userAuth, checkRole } = require("../../utils/Auth");
const { Route } = require('../../models/Route');

// Driver Protected Route to get his profile
// router.get( "/profiles", userAuth, checkRole(["driver"]), async (req, res) => {
//       return res.json(serializeUser(user));
//     }
// );

router.get("/get-routes", async (req, res) => {
  const routes = await Route.find({status: "active"})
    .sort("title")
    .exec();
  res.send(routes);
});


module.exports = router;