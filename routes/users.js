const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  userLogin2,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Sudents Registeration Route
router.post("/register-student", async (req, res) => {
  await userRegister(req.body, "student", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Sub Admin Registration Route
router.post("/register-subadmin", async (req, res) => {
  await userRegister(req.body, "subadmin", res);
});

// Driver Registration Route
router.post("/register-driver", async (req, res) => {
  await userRegister(req.body, "driver", res);
});

// Users Login Route
router.post("/login-student", async (req, res) => {
  await userLogin(req.body, "student", res);
});

// Driver Login Route
router.post("/login-driver", async (req, res) => {
  await userLogin(req.body, "driver", res);
});

// Admin Login Route
// router.post("/login-admin", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

// Login by Role
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const checkRole = user.role;
  await userLogin2(req.body, checkRole, res);
});

// Sub Admin Login Route
// router.post("/login-subadmin", async (req, res) => {
//   await userLogin(req.body, "subadmin", res);
// });

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

router.put("/:id", async (req, res) => {
  // const error  = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

// Admins get Route
router.get("/admins", async (req, res) => {
  const admins = await User.find({ role: "admin" }).sort("name");
  // console.log("Hello")
  res.send(admins);
});

// SubAdmins get Route
router.get("/subadmins", async (req, res) => {
  const subadmins = await User.find({ role: "subadmin" }).sort("name");
  // console.log("Hello")
  res.send(subadmins);
});

// Admin and SubAdmin delete route by ID
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

// Stduent Protected Route
router.get(
  "/student-protectd",
  userAuth,
  checkRole(["student"]),
  async (req, res) => {
    return res.json("Hello Student");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Driver Protected Route
router.get(
  "/driver-protectd",
  userAuth,
  checkRole(["driver"]),
  async (req, res) => {
    return res.json("Hello Driver");
  }
);

router.put("/updatePassword/:id", async (req, res) => {
  const passcode = await bcrypt.hash(req.body.password, 12);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      password: passcode,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

// // Super Admin Protected Route
// router.get(
//   "/super-admin-and-admin-protectd",
//   userAuth,
//   checkRole(["superadmin", "admin"]),
//   async (req, res) => {
//     return res.json("Super admin and Admin");
//   }
// );

module.exports = router;
