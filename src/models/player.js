function newPlayer(username) {
  return {
    username: username,
    role: "drawer",
    isReady: false,
  };
}

module.exports = newPlayer;
