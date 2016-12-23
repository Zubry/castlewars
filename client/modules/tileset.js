// import PIXI from 'pixi.js';
const PIXI = require('pixi.js');

// This will force browserify to recognize the json files
require(`./../../maps/tilesets/terrain.json`);
require(`./../../maps/tilesets/walls.json`);
require(`./../../maps/tilesets/objects.json`);

export default class Tileset {
  constructor() {
    this.terrain = this.load('terrain');
    this.walls = this.load('walls');;
    this.objects = this.load('objects');
  }

  load(file) {
    const width = 50;
    const tiles = require(`./../../maps/tilesets/${file}.json`);

    const baseTexture = PIXI.BaseTexture.fromImage(`./tilesets/${file}.png`);

    const textures = tiles
      .map(({name, x, y, solid}) => ({ rectangle: new PIXI.Rectangle(x * width, y * width, width, width), name, x, y, solid }))
      .map(({rectangle, name, x, y, solid}) => {
        const texture = new PIXI.Texture(baseTexture, rectangle);
        return { texture, name, x, y, solid};
      })
      // .map(({texture, name, x, y}) => ({ texture: new PIXI.Sprite(texture), name, x, y }))
      .reduce((acc, {texture, name, x, y, solid}) => {
        acc[y * 20 + x + 1] = { texture, name, x, y, solid };
        return acc;
      }, {});

    return textures;
  }

  sprite(n) {
    if (n >= 80) {
      return new PIXI.Sprite(this.objects[n - 80].texture);
    } else if (n >= 40) {
      return new PIXI.Sprite(this.walls[n - 40].texture);
    } else {
      return new PIXI.Sprite(this.terrain[n].texture);
    }
  }
}
