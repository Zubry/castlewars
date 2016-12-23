module.exports = e => {
  e.on('on-object-1', (player, state) => {
    if (player.at(22, 7, 0)) {
      player.teleport(22, 8, 1);
    } else if (player.at(22, 7, 1)) {
      player.teleport(22, 8, 0);
    }
  });
}
