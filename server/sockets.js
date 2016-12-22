const Player = require('./modules/player');

module.exports = function(io, game) {
  io.on('connection', function (socket) {
    console.log('connect');
    socket.emit('connected', game.map.grid);

    socket.on('join-game', function () {
      const player = new Player(socket);
      game.join(player);
      socket.emit('you-have-joined', player.id);
    });

    socket.on('terrain-click', ({ x, y }) => {
      game
        .getPlayerByClientID(socket.id)
        .path_to(game.map, x, y);
    });

    socket.on('disconnect', function() {
      console.log('disconnect');
      game.leave(socket);
    });
  });
};
