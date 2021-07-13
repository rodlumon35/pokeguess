const mongoose = require("mongoose");
const { Schema } = mongoose;
const PlayerSchema = new Schema({
  username: String,
  role: String,
  isReady: Boolean,
});
const PlayerDbConnection = mongoose.model("PlayerSchema", PlayerSchema);

function newPlayer(username) {
  return {
    username: username,
    role: "drawer",
    isReady: false,
  };
}

module.exports = {
  newPlayer,
  PlayerDbConnection,
};
