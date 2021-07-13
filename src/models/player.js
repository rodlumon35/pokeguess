const mongoose = require("mongoose");
const { Schema } = mongoose;
const PlayerSchema = new Schema({
  username: String,
  role: String,
  isReady: Boolean,
  token: String,
});
const PlayerDbConnection = mongoose.model("PlayerSchema", PlayerSchema);

function newPlayer(username) {
  return {
    username: username,
    role: "drawer",
    isReady: false,
    token: generateToken(),
  };
}

function generateToken() {
  return Math.random().toString(36).slice(-5);
}

module.exports = {
  newPlayer,
  PlayerDbConnection,
};
