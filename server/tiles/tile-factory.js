module.exports = class TileFactory {
  constructor(type) {
    this.solid = false;
    this.type = type;

    const table = require('./terrain.json');
    this.solid = table[type];
  }
}
