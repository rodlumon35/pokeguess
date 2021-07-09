const mongoose = require("mongoose");
const { Schema } = mongoose;
const GameSchema = new Schema({
  activePlayers: Number,
  playerList: Array,
  players: Number,
  token: Number,
});
const GameDbConnection = mongoose.model("GameSchema", GameSchema);

class Game {
  activePlayers = 0;
  playerList = [];

  constructor(numPlayers = 3, drawTimeDuration = 2.5) {
    this.players = numPlayers;
    this.drawTimeDuration = drawTimeDuration;
    this.token = this.generateToken();
  }

  joinPlayerInGame(playerUsername) {
    this.playerList.push(playerUsername);
    this.setActivePlayers();
  }

  setActivePlayers() {
    this.activePlayers = this.players.length;
  }

  getNumPlayers() {
    return this.players;
  }

  generateToken() {
    return (Math.floor(Math.random() * 9999) + 1).toString().padStart(4, 0);
  }
}

module.exports = {
  Game,
  GameDbConnection
};
