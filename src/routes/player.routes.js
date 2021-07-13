const express = require("express");
const router = express.Router();
const { PlayerDbConnection, newPlayer } = require("../models/player");

router.post("/create", async (req, res) => {
  const { username } = req.body;
  const user = await PlayerDbConnection.findOne({
    username: username,
  });

  if (!user) {
    const user = newPlayer(username);
    const playerDb = new PlayerDbConnection({
      username: user.username,
      role: user.role,
      isReady: user.isReady,
      token: user.token,
    });

    await playerDb.save();
    res.json({
      status: "success",
      data: user,
    });
  } else {
    res.json({
      status: "error",
      data: { message: "Existing username" },
    });
  }
});

router.get("/", async (req, res) => {
  const allUsers = await PlayerDbConnection.find();
  res.json(allUsers);
});

router.delete("/:username", async (req, res) => {
  const player = await PlayerDbConnection.findOne({
    username: req.params.username,
  });

  if (player && player.token === req.body.token) {
    await PlayerDbConnection.findByIdAndRemove(player._id);
    res.json({ status: "success", data: { message: "Player was deleted" } });
  } else {
    res.json({ status: "error", data: { message: "Player not valid" } });
  }
});

module.exports = router;
