const express = require("express");
const router = express.Router();
const { PlayerDbConnection, newPlayer } = require("../models/player");

router.post("/create", async (req, res) => {
  const { username } = req.body;
  const user = newPlayer(username);
  const playerDb = new PlayerDbConnection({
    username: user.username,
    role: user.role,
    isReady: user.isReady,
  });

  await playerDb.save();
  res.json({
    status: "success",
    data: user,
  });
});

router.get("/", async (req, res) => {
  const allUsers = await PlayerDbConnection.find();
  res.json(allUsers);
})

module.exports = router;
