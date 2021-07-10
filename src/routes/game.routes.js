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
  console.log(gameDb);

  await gameDb.save();
  res.json({
    status: "success",
    data: game,
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
    status: 200,
    data: game,
  });
});

router.delete("/:token", async (req, res) => {
  const game = await GameDbConnection.findOne({ token: req.params.token });
  let message = "game was deleted";

  if (game) {
    await GameDbConnection.findByIdAndRemove(game._id);
    res.json({ status: 200, data: { message: message } });
  } else {
    message = "Game not found";
    res.json({ status: 404, data: { message: message } });
  }
});

router.put('/init-game/:token', (req, res) => {
  
})

module.exports = router;
