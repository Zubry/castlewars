import React from 'react';
import ReactDOM from 'react-dom';

import GameView from './game-view';

export default class JoinedGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      lobby: [],
      ticks: 0
    };
  }

  componentDidMount() {
    this.props.socket
      .on('game-tick', (data) => {
        if (data.ticks > 0) {
          return false;
        }

        this.setState(data)
      });
  }

  render() {
    return (
      <div>
        {
          this.state.ticks < 0 ?
            <div>
              <h1>A new game will start in {Math.floor(this.state.ticks * 300 / 1000) * -1 } seconds</h1>
              <h2>There are {this.state.lobby.length} players in the lobby</h2>
            </div>
          :
            <GameView pid={this.props.pid} socket={this.props.socket}></GameView>
        }

      </div>
    );
  }
}
