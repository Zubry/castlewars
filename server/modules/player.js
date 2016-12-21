const uuid = require('uuid/v4');

module.exports = class Player {
  constructor(client) {
    this.client = client;
    this.id = uuid();

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.team = undefined;
  }

  assign_team(team) {
    this.team = team;

    this.respawn();
  }

  reset() {
    this.team = undefined;
    return this;
  }

  serialize() {
    return {
      id: this.id,
      team: this.team,
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  teleport(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  shift(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
  }

  respawn() {
    if (this.team === 'zamorak') {
      this.z = 0;
      this.x = 13;
      this.y = 12;
    } else if (this.team === 'saradomin') {
      this.z = 0;
      this.x = 87;
      this.y = 88;
    }
  }
}
