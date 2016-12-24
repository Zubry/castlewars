const uuid = require('uuid/v4');
const path = require('./pathfinding');

const Combat = require('./combat');
const EquipmentFactory = require('./equipment-factory');

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

    this.combat = new Combat();
  }

  assign_team(team) {
    this.team = team;

    this.combat.equipment.equip(new EquipmentFactory(`${team}-hood`));
    this.combat.equipment.equip(new EquipmentFactory(`${team}-cape`));
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
      orientation: this.orientation,
      health: this.combat.health,
      maxHealth: this.combat.maxHealth,
      animations: {
        attacking: this.canAttack(),
        walking: this.path.length > 0
      }
    };
  }

  teleport(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z !== undefined ? z : this.z;

    this.path = [];
  }

  path_to(map, x, y) {
    this.combat.deselectTarget();
    this.path = path.find(map, { x: this.x, y: this.y, z: this.z }, { x, y });
  }

  step() {
    // If we don't have a path, there isn't much we can do
    if (this.path.length === 0) {
      return false;
    }

    // If we have a target, we need to stop 1 spot short of them
    if (this.combat.target && this.path.length === 1) {
      this.path = [];
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
      this.y = 13;
    } else if (this.team === 'saradomin') {
      this.z = 0;
      this.x = 87;
      this.y = 87;
    }

    this.combat.deselectTarget();
    this.combat.full_heal();
    this.path = [];
  }

  at(x, y, z) {
    return this.x === x && this.y === y && this.z === z;
  }

  // The main difference between Manhattan distance and Chebyshev (chess) distance
  // Is that diagonal movements are 2 units away in Manhattan
  // And only 1 in Chebyshev distance
  withinManhattanDistance({x, y, z}, distance) {
    return this.z === z
      && (Math.abs(this.x - x) + Math.abs(this.y - y)) <= distance;
  }

  withinChebyshevDistance({x, y, z}, distance) {
    return this.z === z
      && Math.abs(this.x - x) <= distance
      && Math.abs(this.y - y) <= distance;
  }

  canAttack() {
    const range = this.combat.equipment.weapon ? this.combat.equipment.weapon.range : 1;

    return this.combat.target !== undefined && this.withinChebyshevDistance(this.combat.target, range);
  }
}
