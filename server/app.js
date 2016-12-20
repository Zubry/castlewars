const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const options = {
  max_lifespan: 400,
  ticks_between_games: 100
};

const Game = require('./modules/game')
const game = new Game(options);

const routes = require('./router.js')(app);
const sockets = require('./sockets.js')(io, game);

server.listen(process.env.PORT || 8080);

function game_tick() {
  console.log('tick');
  game.increase_lifespan();

  io.emit('game-tick', game.serialize())
}

setInterval(game_tick, 300);
