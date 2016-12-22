import React from 'react';
import ReactDOM from 'react-dom';

import JoinedGame from './joined-game';

export default class GameWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      joined: false,
      pid: 0
    };
  }

  componentDidMount() {
    this.props.socket
      .on('connected', (map) => this.setState({ connected: true }))

    this.props.socket
      .on('you-have-joined', (pid) => this.setState({ pid, joined: true }));
  }

  handleSubmit(e) {
    this.props.socket.emit('join-game');
    e.preventDefault();
  }

  render() {
    if (!this.state.connected && !this.state.joined) {
      return <div className="not-connected">
        <h1>You are not connected!</h1>
      </div>;
    } else if (!this.state.joined) {
      return <form className="connected">
        <h1>You are connected to the server!</h1>
        <button onClick={this.handleSubmit.bind(this)}>Join</button>
      </form>
    } else {
      return <JoinedGame socket={this.props.socket} pid={this.state.pid}></JoinedGame>
    }
  }
}
