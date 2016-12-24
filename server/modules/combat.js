const Equipment = require('./equipment');

module.exports = class Combat {
  constructor() {
    this.equipment = new Equipment();

    this.target = undefined;

    this.health = 99;
    this.maxHealth = 99;
  }

  roll(max) {
    return Math.floor(Math.random() * max);
  }

  selectTarget(target) {
    if (target.team === this.team) {
      return false;
    }

    this.target = target;
  }

  deselectTarget() {
    this.target = undefined;
  }

  rollDefense(type) {
    return this.roll(this.equipment.bonus(`${type}-defense`));
  }

  rollAttack(type) {
    return this.roll(this.equipment.bonus(`${type}-attack`));
  }

  rollStrength(type) {
    console.log('strength roll: ', this.equipment.bonus(`${type}-strength`));
    return this.roll(this.equipment.bonus(`${type}-strength`));
  }

  attack() {
    if (!this.target) {
      return false;
    }
    
    const type = this.equipment.weapon ? this.equipment.weapon.type : 'melee';

    const attackRoll = this.rollAttack(type);
    const defenseRoll = this.target.combat.rollDefense(type);

    console.log(`Attacking, attack roll: ${attackRoll} defense roll: ${defenseRoll}`);

    if (attackRoll > defenseRoll) {
      const hit = this.rollStrength(type);
      this.target.combat.damage(hit);

      console.log(`dealt target ${hit} damage, ${this.target.combat.health} remaining`);

      if (!this.target.combat.alive()) {
        console.log('player died, should respawn');
        this.target.respawn();
        this.deselectTarget();
      }
    }
  }

  alive() {
    return this.health > 0;
  }

  heal(amount) {
    this.health += amount;

    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }

  full_heal() {
    this.health = this.maxHealth;
  }

  damage(amount) {
    this.health -= amount;
  }
}
