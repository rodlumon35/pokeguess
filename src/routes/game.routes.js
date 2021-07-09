const express = require("express");
const router = express.Router();
const Game = require("../models/game.js");

router.post("/new-game", (req, res) => {
  const { numPlayers, drawTimeDuration } = req.body;
  res.json({
    game: new Game(numPlayers, drawTimeDuration),
  });
});

router.post("/join-game", (req, res) => {});

router.delete("/end-game", (req, res) => {});

module.exports = router;
