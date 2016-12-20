const uuid = require('uuid/v4');

module.exports = class Player {
  constructor(client) {
    this.client = client;
    this.id = uuid();

    this.team = undefined;
  }

  assign_team(team) {
    this.team = team;
  }

  reset() {
    this.team = undefined;
    return this;
  }

  serialize() {
    return {
      id: this.id,
      team: this.team
    };
  }
}
