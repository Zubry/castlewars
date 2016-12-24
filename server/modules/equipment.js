module.exports = class Equipment {
  constructor() {
    this.helmet = undefined;
    this.cape = undefined;
    this.torso = undefined;
    this.legs = undefined;
    this.boots = undefined;
    this.gloves = undefined;
    this.weapon = undefined;
  }

  equip(item) {
    if (!item.equippable) {
      return false;
    }

    const previous = this[item.slot];
    this[item.slot] = item;

    console.log(`Equipped ${item.slot}`);

    return previous;
  }

  unequip(slot) {
    if (!this[slot]) {
      return false;
    }

    const previous = this[item.slot];
    this[item.slot] = undefined;

    return previous;
  }

  asArray() {
    return [
      this['helmet'],
      this['cape'],
      this['torso'],
      this['legs'],
      this['boots'],
      this['gloves']
    ];
  }

  bonus(bonus) {
    return this.asArray()
      .filter((equipment) => equipment)
      // .filter((equipment) => equipment[bonus])
      .map((equipment) => equipment[bonus])
      .reduce((acc, i) => acc + i, 0)
  }
}
