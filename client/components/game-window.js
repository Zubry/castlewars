import React from 'react';
import ReactDOM from 'react-dom';

import JoinedGame from './joined-game';

export default class GameWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      joined: false
    };
  }

  componentDidMount() {
    this.props.socket
      .on('connected', () => this.setState({ connected: true }))

    this.props.socket
      .on('game-tick', (c) => console.log(c));
  }

  handleSubmit(e) {
    this.props.socket.emit('join-game');
    this.setState({ joined: true });
    e.preventDefault();
  }

  render() {
    if (!this.state.connected && !this.state.joined) {
      return <div>
        <h1>You are not connected!</h1>
      </div>;
    } else if (!this.state.joined) {
      return <form>
        <h1>You are connected to the server!</h1>
        <button onClick={this.handleSubmit.bind(this)}>Join</button>
      </form>
    } else {
      return <JoinedGame socket={this.props.socket}></JoinedGame>
    }
  }
}
