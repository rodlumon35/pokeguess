const express = require("express");
const router = express.Router();
const Game = require("../models/game.js");

router.post("/new-game", (req, res) => {
  res.json({
    game: new Game(req.body.numPlayers),
  });
});

router.post("/join-game", (req, res) => {});

router.delete("/end-game", (req, res) => {});

module.exports = router;
