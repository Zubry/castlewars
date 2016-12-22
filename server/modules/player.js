const uuid = require('uuid/v4');
const path = require('./pathfinding');

module.exports = class Player {
  constructor(client) {
    this.client = client;
    this.id = uuid();

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.orientation = 0;

    this.path = [];

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
      z: this.z,
      orientation: this.orientation
    };
  }

  teleport(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z !== undefined ? z : this.z;
  }

  path_to(map, x, y) {
    this.path = path.find(map, { x: this.x, y: this.y, z: this.z }, { x, y });
  }

  step() {
    if (this.path.length === 0) {
      return false;
    }

    this.facePoint(this.path[0]);
    this.x = this.path[0].x;
    this.y = this.path[0].y;

    this.path = this.path.slice(1);
  }

  facePoint({x, y}) {
    // Get the points with the origin at the player
    const ox = x - this.x;
    const oy = y - this.y;

    if (ox === 0 && oy === 0) {
      return false;
    }

    this.orientation = Math.atan2(oy, ox);
  }

  shift(x = 0, y = 0, z = 0) {
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
