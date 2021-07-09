const express = require("express");
const router = express.Router();
const { Game, GameDbConnection } = require("../models/game");

router.post("/new-game", async (req, res) => {
  const { numPlayers, drawTimeDuration } = req.body;
  const game = new Game(numPlayers, drawTimeDuration);
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
    data: game,
  });
});

router.get("/", async (req, res) => {
  const allGames = await GameDbConnection.find();
  console.log(allGames);
  res.json(allGames);
});

router.post("/join-game", (req, res) => {});

router.delete("/end-game", (req, res) => {});

module.exports = router;
