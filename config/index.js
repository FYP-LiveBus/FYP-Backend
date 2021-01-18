require("dotenv").config();

module.exports = {
  DB:
    // "mongodb://faran:Comsian088@livebus-shard-00-02.eluhe.mongodb.net:27017/LiveBus?ssl=true&replicaSet=atlas-mb9v0n-shard-0&authSource=admin&retryWrites=true&w=majority",
    "mongodb+srv://faran:Comsian088@livebus.eluhe.mongodb.net/Livebus?retryWrites=true&w=majority",
  PORT: process.env.APP_PORT,
  SECRET: "qwertyuiop",
  // DB: process.env.APP_DB,
  // SECRET: process.env.APP_SECRET
};
