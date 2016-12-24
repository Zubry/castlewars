module.exports = class EquipmentFactory {
  constructor(equipment) {
    const e = require(`../scripts/items/equipment/${equipment}.js`);

    Object.keys(e)
      .map((k) => [k, e[k]])
      .forEach(([k, v]) => this[k] = v);

    this.name = equipment;
  }
}
