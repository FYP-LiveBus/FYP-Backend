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

// var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// app.use(cors());
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
// app.use("/api/routes", require("./routes/routes"));
// app.use("/api/stops", require("./routes/stops"));


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
    
    io.on('connection', (socket) => {
      io.clients((error, clients) => {
        if (error) throw error;
        console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
      });
    
      socket.on('position', (position) => {
        // console.log('position with id -----------------\n', position)
        socket.broadcast.emit('otherPositions', position);
      })
    
      socket.on('disconnect', () => {
        // console.log(`Connection ${socket.id} has left the building`)
      })
    
    });
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
    startApp();
  }

};


startApp();
