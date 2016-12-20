class Game {
  constructor(socket) {
    this.socket = socket;
  }

  join(name) {
    this.socket.emit('join-game', { name });
  }
}

module.exports = Game;
