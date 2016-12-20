import React from 'react';
import ReactDOM from 'react-dom';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    this.props.socket
      .on('game-tick', ({players}) => {
        this.setState({players})
      });
  }

  render() {
    return (
      <div>
        {
          this.state.players
            .map(({id}, i) => <div key={i}>{id}</div>)
        }
      </div>
    );
  }
}
