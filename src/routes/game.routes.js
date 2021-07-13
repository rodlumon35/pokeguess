const express = require("express");
const router = express.Router();
const { Game, GameDbConnection } = require("../models/game");
const newPlayer = require("../models/player");
require("../models/player");

router.post("/new-game", async (req, res) => {
  const { hoster, numPlayers, drawTimeDuration } = req.body;
  const game = new Game(numPlayers, drawTimeDuration, newPlayer(hoster));
  const gameDb = new GameDbConnection({
    activePlayers: game.activePlayers,
    playerList: game.playerList,
    players: game.players,
    token: game.token,
    drawTimeDuration: game.drawTimeDuration,
  });

  await gameDb.save();
  res.json({
    status: "success",
    data: game.token,
  });
});

router.get("/", async (req, res) => {
  const allGames = await GameDbConnection.find();
  res.json(allGames);
});

router.put("/join-game/:token", async (req, res) => {
  const game = await GameDbConnection.findOne({ token: req.params.token });
  game.playerList.push(newPlayer(req.body.username));

  game.save();
  res.json({
    status: "success",
    data: game,
  });
});

router.delete("/:token", async (req, res) => {
  const game = await GameDbConnection.findOne({ token: req.params.token });

  if (game) {
    await GameDbConnection.findByIdAndRemove(game._id);
    res.json({ status: "success", data: { message: "Game was deleted" } });
  } else {
    res.json({ status: "error", data: { message: "Game not found" } });
  }
});

router.put("/init-game/:token", async (req, res) => {
  const game = await GameDbConnection.findOne({ token: req.params.token });

  if (game.activePlayers === game.players) {
    res.json({ status: "success", data: { game } });
  } else {
    res.json({
      status: "error",
      data: { message: "Some players are still missing" },
    });
  }
});

module.exports = router;
