const mongoose = require("mongoose");
const { Schema } = mongoose;
const GameSchema = new Schema({
  activePlayers: Number,
  playerList: Array,
  players: Number,
  token: Number,
  drawTimeDuration: Number,
});
const GameDbConnection = mongoose.model("GameSchema", GameSchema);

class Game {
  activePlayers = 0;

  constructor(numPlayers = 3, drawTimeDuration = 2.5, hoster) {
    this.players = numPlayers;
    this.drawTimeDuration = drawTimeDuration;
    this.playerList = [hoster];
    this.token = this.generateToken();
  }

  generateToken() {
    return (Math.floor(Math.random() * 9999) + 1).toString().padStart(4, 0);
  }

  static getRoles(players) {
    let index = Math.floor(Math.random() * players.length);
    players[index].role = "speaker";

    return players;
  }

  static getReadyPlayers(players) {
    let readyPlayers = 0;
    players.forEach((player) => {
      if (player.isReady) {
        readyPlayers++
      }
    });

    return readyPlayers === players.length ? true : false;
  }
}

module.exports = {
  Game,
  GameDbConnection,
};
