const uuid = require('uuid/v4');
const Player = require('./player');
const Map = require('./map');
const EventEmitter = require('events');

module.exports = class Game {
  constructor(options) {
    this.options = options;
    this.lifespan = -1 * this.options.ticks_between_games;

    this.lobby = [];
    this.players = [];

    this.events = new EventEmitter();

    this.map = new Map();
  }

  get_team_count(team) {
    return this.players.filter((p) => p.team === team).length
  }

  join(player) {
    if (this.lifespan < 0) {
      this.lobby.push(player);
    } else {
      const zamorak = this.get_team_count('zamorak');
      const saradomin = this.get_team_count('saradomin');

      if (zamorak > saradomin) {
        player.assign_team('saradomin');
      } else {
        player.assign_team('zamorak');
      }

      this.players.push(player);
    }
  }

  getPlayerByClientID(id) {
    return this.players.find((p) => p.client.id === id)
      || this.lobby.find((p) => p.client.id === id);
  }

  leave(client) {
    if (this.lifespan < 0) {
      this.lobby = this.lobby.filter((p) => p.client.id !== client.id);
    } else {
      this.players = this.players.filter((p) => p.client.id !== client.id);
    }
  }

  increase_lifespan() {
    this.lifespan++;

    if (this.lifespan === 0) {
      this.start();
    }

    if (this.lifespan >= this.options.max_lifespan) {
      this.end();
    }
  }

  move_players() {
    this.players
      .forEach((player) => player.step())
  }

  fire_terrain_events() {
    this
      .players
      .forEach((player) => this.events.emit(`on-${this.map.at(player.x, player.y, player.z).terrain.type}`, player, this));

    this
      .players
      .filter((player) => this.map.at(player.x, player.y, player.z).objects)
      .forEach((player) => this.events.emit(`on-object-${this.map.at(player.x, player.y, player.z).objects.gid - 80}`, player, this));
  }

  end() {
    this.lifespan = -1 * this.options.ticks_between_games;
    this.lobby = this.players.slice(0);

    this.players = [];
  }

  start() {
    // Assign lobby to players
    this.players = this.lobby
      .map((player, i) => {
        i % 2 ? player.assign_team('saradomin') : player.assign_team('zamorak');
        return player;
      });

    this.lobby = [];
  }

  serialize() {
    return {
      ticks: this.lifespan,
      players: this.players.map((player) => player.serialize()),
      lobby: this.lobby.map((player) => player.serialize())
    }
  }
}
