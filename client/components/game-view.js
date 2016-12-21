import ElementContainer from 'react-element-container';
import React from 'react';
import ReactDOM from 'react-dom';

import GameView from './game-view';

import Map from './../modules/map';
const map = new Map();

import Tileset from './../modules/tileset';
const tileset = new Tileset();

const PIXI = require('pixi.js');

export default class JoinedGame extends React.Component {
  constructor(props) {
    super(props);

    const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    const stage = new PIXI.Container();

    this.state = {
      players: [],
      lobby: [],
      ticks: 0,
      stage,
      renderer
    };

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.state.renderer.view.width = w;
      this.state.renderer.view.height = h;

      this.state.renderer.resize(w, h);
    })
  }

  componentDidMount() {
    this.props.socket
      .on('game-tick', (data) => {
        if (data.ticks < 0) {
          return false;
        }

        this.setState(data)
        this.onGameTick();
      });
  }

  onGameTick() {
    if (this.state.ticks < 0 || this.state.players.length === 0) {
      return false;
    }

    this.state.stage.removeChildren();

    const me = this.state.players.find((player) => player.id === this.props.pid);

    if (!me) {
      return false;
    }

    const w = Math.floor(this.state.renderer.view.width / 50);
    const h = Math.floor(this.state.renderer.view.height / 50);

    const offsetx = (this.state.renderer.view.width - w * 50) >> 1;
    const offsety = (this.state.renderer.view.height - h * 50) >> 1;

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        const x = me.x + i - (w >> 1);
        const y = me.y + j - (h >> 1);
        const z = me.z;

        const { terrain, walls } = map.at(x, y, z);

        if (!terrain) {
          continue;
        }

        const terrain_sprite = tileset.sprite(terrain);
        terrain_sprite.x = i * 50 + offsetx;
        terrain_sprite.y = j * 50 + offsety;

        this.state.stage.addChild(terrain_sprite);

        if (!walls) {
          continue;
        }

        const wall_sprite = tileset.sprite(walls);
        wall_sprite.x = i * 50 + offsetx;
        wall_sprite.y = j * 50 + offsety;

        this.state.stage.addChild(wall_sprite);

      }
    }

    this.state.renderer.render(this.state.stage);
  }

  render() {
    return <ElementContainer child={this.state.renderer.view}/>
  }
}
