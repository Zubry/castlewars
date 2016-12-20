const Player = require('./modules/player');

module.exports = function(io, game) {
  io.on('connection', function (socket) {
    socket.emit('connected', {});

    socket.on('join-game', function () {
      const player = new Player(socket);
      game.join(player);
    });

    socket.on('disconnect', function() {
      game.leave(socket);
    });
  });
};
