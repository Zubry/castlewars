module.exports = class WallFactory {
  constructor(type) {
    this.north = false;
    this.east = false;
    this.south = false;
    this.west = false;

    const table = require('./walls.json');

    if (type < 40) {
      return false;
    }

    table[type - 40]
      .forEach((direction) => this[direction] = true);
  }
}
