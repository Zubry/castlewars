module.exports = class Map {
  constructor() {
    this.load();
  }

  load() {
    const raw_file = require('./../../maps/castlewars.json');

    this.grid = raw_file.layers
      .reduce((acc, layer, i) => {
        if (!acc[Math.floor(i / 2)]) {
          acc[Math.floor(i / 2)] = [];
        }

        acc[Math.floor(i / 2)][i % 2] = layer;
        return acc;
      }, [])
      .filter((a) => a.length)
      .map((layers) => {
        return layers
          .map(({data, height}) => {
            return data
              .reduce((acc, tile, i) => {
                if (!acc[i % height]) {
                  acc[i % height] = {};
                }

                acc[i % height][Math.floor(i / height)] = tile;
                return acc;
              }, {});
          });
      });
  }

  at(x, y, z) {
    if (x > 99 || y > 99 || x < 0 || y < 0 || z < 0) {
      return {
        terrain: 10,
        walls: 0
      }
    }
    return {
      terrain: this.grid[z][0][x][y],
      walls: this.grid[z][1][x][y]
    };
  }
}
