require("dotenv").config();

module.exports = {
  DB:
    "mongodb+srv://faran:Comsian088@livebus.eluhe.mongodb.net/Livebus?retryWrites=true&w=majority",
  // DB: "mongodb+srv://faran:Comsian088@livebus.eluhe.mongodb.net/test",
  PORT: process.env.APP_PORT,
  SECRET: "qwertyuiop",
  // DB: process.env.APP_DB,
  // SECRET: process.env.APP_SECRET
};
