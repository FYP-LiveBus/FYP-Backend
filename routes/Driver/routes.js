const router = require("express").Router();
const { userAuth, checkRole } = require("../../utils/Auth");

// Driver Protected Route to get his profile
router.get( "/profiles", userAuth, checkRole(["driver"]), async (req, res) => {
      return res.json("Hello Driver");
    }
);

router.get("")


module.exports = router;