const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
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
router.post("/register-sub-admin", async (req, res) => {
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

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Driver Login Route
router.post("/login-driver", async (req, res) => {
  await userLogin(req.body, "driver", res);
});

// Sub Admin Login Route
router.post("/login-subadmin", async (req, res) => {
  await userLogin(req.body, "subadmin", res);
});


// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
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
