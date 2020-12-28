const cors = require('cors');
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// User Router Middleware
app.use("/api/users", require("./routes/users")); // login / resgistration
app.use("/api/admin/drivers", require("./routes/Admin/drivers"));
app.use("/api/admin/conductors", require("./routes/Admin/conductors"));
app.use("/api/admin/students", require("./routes/Admin/students"));
app.use("/api/admin/buses", require("./routes/Admin/buses"));
app.use("/api/drivers", require("./routes/Driver/routes"));
app.use("/api/admin/routes", require("./routes/Admin/routes"));
app.use("/api/admin/stops", require("./routes/Admin/stops"));
app.use("/api/admin/notifications", require("./routes/Admin/notifications"));
app.use("/api/driver/trips", require("./routes/Driver/trips"));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    // Start Listenting for the server on PORT
    app.listen(process.env.PORT || PORT, () =>
      success({ message: `Server started on PORT `, badge: true })
    );
    
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
    startApp();
  }

};

startApp();
