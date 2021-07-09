const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const { mongoose } = require("./database");
require("dotenv").config();

// Settings
app.set("PORT", process.env.PORT || 5000);

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/game", require("./routes/game.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Server start
app.listen(app.get("PORT"), () => {
  console.log(`running server on http://localhost:${app.get("PORT")}`);
});
