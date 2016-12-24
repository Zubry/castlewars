module.exports = e => {
  e.on('on-object-1', (player, state) => {
    if (player.at(22, 7, 0)) {
      player.teleport(22, 8, 1);
    } else if (player.at(22, 7, 1)) {
      player.teleport(22, 8, 0);
    }
  });

  e.on('click-object-1', (player, state, {x, y}) => {
    if (player.withinManhattanDistance({ x: 22, y: 7, z: 0}, 1)) {
      player.teleport(22, 8, 1);
    } else if (player.withinManhattanDistance({ x: 22, y: 7, z: 1}, 1)) {
      player.teleport(22, 8, 0);
    } else {
      player.path_to(state.map, x, y);
    }
  });
}
