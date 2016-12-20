import React from 'react';
import ReactDOM from 'react-dom';

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
            <div>
              { this.state.players.map((player, i) => <div key={i}>{player.id}: {player.team}</div>)}
            </div>
        }

      </div>
    );
  }
}
