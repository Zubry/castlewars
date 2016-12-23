const TileFactory = require('./../tiles/tile-factory');
const WallFactory = require('./../tiles/wall-factory');

module.exports = class Map {
  constructor() {
    this.load();
  }

  load() {
    const raw_file = require('./../../maps/castlewars.json');

    this.grid = raw_file.layers
      .reduce((acc, layer, i) => {
        if (!acc[Math.floor(i / 3)]) {
          acc[Math.floor(i / 3)] = [];
        }

        acc[Math.floor(i / 3)][i % 3] = layer;
        return acc;
      }, [])
      .filter((a) => a.length)
      .map((layers) => {
        return layers
          .map((layer) => {
            if (layer.data) {
              return layer.data
                  .reduce((acc, tile, i) => {
                    if (!acc[i % layer.height]) {
                      acc[i % layer.height] = {};
                    }

                    acc[i % layer.height][Math.floor(i / layer.height)] = tile;
                    return acc;
                  }, {});
              } else {
                return layer.objects.map((obj) => ({ gid: obj.gid, x: Math.floor(obj.x / 50), y: Math.floor(obj.y / 50) - 1}));
              }
            });
      });
  }

  at(x, y, z) {
    if (x > 99 || y > 99 || x < 0 || y < 0 || z < 0) {
      return {
        terrain: new TileFactory(10),
        walls: new WallFactory(0),
        objects: undefined
      }
    }
    
    return {
      terrain: new TileFactory(this.grid[z][0][x][y]),
      walls: new WallFactory(this.grid[z][1][x][y]),
      objects: this.grid[z][2].find((o) => x === o.x && y === o.y)
    };
  }
}
