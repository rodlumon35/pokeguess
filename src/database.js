const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error("DB is missing"));

module.exports = mongoose;
