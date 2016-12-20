const io = require('socket.io-client');

const socket = io.connect();

import React from 'react';
import ReactDOM from 'react-dom';

import GameWindow from './components/game-window';

ReactDOM.render(
  <GameWindow socket={socket}></GameWindow>,
  document.getElementById('root')
);
