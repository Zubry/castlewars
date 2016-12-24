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
      const player = game
        .getPlayerByClientID(socket.id);

      const target = game
        .getPlayerAt({ x, y, z: player.z});

      if (target) {
        player.path_to(game.map, target.x, target.y);
        player.combat.selectTarget(target);
      } else if (game.map.at(x, y, player.z).objects) {
        const obj = game.map.at(x, y, player.z).objects;
        game.events.emit(`click-object-${obj.gid - 80}`, player, game, { x, y });
      } else {
        player.path_to(game.map, x, y);
      }
    });

    socket.on('disconnect', function() {
      console.log('disconnect');
      game.leave(socket);
    });
  });
};
