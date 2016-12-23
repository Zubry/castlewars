const map = require('./map');

function blocked(map, direction, current, newLocation, z) {
  const { walls: current_walls } = map.at(current.x, current.y, z);
  const { walls: new_walls } = map.at(newLocation.x, newLocation.y, z);

  switch (direction) {
    case 'north': return current_walls.north || new_walls.south;
    case 'east': return current_walls.east || new_walls.west;
    case 'south': return current_walls.south || new_walls.north;
    case 'west': return current_walls.west || new_walls.east;
  }
}

function explore(tile, direction) {
  let next = {};

  let newLocation = {
    'x': tile.x,
    'y': tile.y
  };

  if (direction === 'north') {
    newLocation.y -= 1;
    next.x = tile.x;
    next.y = tile.y - 1;
  } else if (direction === 'east') {
    newLocation.x += 1;
    next.x = tile.x + 1;
    next.y = tile.y;
  } else if (direction === 'south') {
    newLocation.y += 1;
    next.x = tile.x;
    next.y = tile.y + 1;
  } else if (direction === 'west') {
    newLocation.x -= 1;
    next.x = tile.x - 1;
    next.y = tile.y;
  }

  newLocation.path = tile.path.concat([next]);

  return newLocation;
}

function pathfinding(map, start, end) {
  const z = start.z;

  const location = {
    'x': start.x,
    'y': start.y,
    'path': []
  };

  let queue = [location];
  let visited = {};

  while (queue.length > 0 && queue.length < 10000) {
    const current = queue.shift();
    visited[`${current.x},${current.y}`] = true;

    let newLocation = explore(current, 'north');
    if (newLocation.x === end.x && newLocation.y === end.y) {
      return newLocation.path;
    } else if (!map.at(newLocation.x, newLocation.y, z).terrain.solid && !visited[`${newLocation.x},${newLocation.y}`] && !blocked(map, 'north', current, newLocation, z)) {
      visited[`${newLocation.x},${newLocation.y}`] = true;
      queue.push(newLocation);
    }

    newLocation = explore(current, 'east');
    if (newLocation.x === end.x && newLocation.y === end.y) {
      return newLocation.path;
    } else if (!map.at(newLocation.x, newLocation.y, z).terrain.solid && !visited[`${newLocation.x},${newLocation.y}`] && !blocked(map, 'east', current, newLocation, z)) {
      visited[`${newLocation.x},${newLocation.y}`] = true;
      queue.push(newLocation);
    }

    newLocation = explore(current, 'south');
    if (newLocation.x === end.x && newLocation.y === end.y) {
      return newLocation.path;
    } else if (!map.at(newLocation.x, newLocation.y, z).terrain.solid && !visited[`${newLocation.x},${newLocation.y}`] && !blocked(map, 'south', current, newLocation, z)) {
      visited[`${newLocation.x},${newLocation.y}`] = true;
      queue.push(newLocation);
    }

    newLocation = explore(current, 'west');
    if (newLocation.x === end.x && newLocation.y === end.y) {
      return newLocation.path;
    } else if (!map.at(newLocation.x, newLocation.y, z).terrain.solid && !visited[`${newLocation.x},${newLocation.y}`] && !blocked(map, 'west', current, newLocation, z)) {
      visited[`${newLocation.x},${newLocation.y}`] = true;
      queue.push(newLocation);
    }
  }

  return [];
}

function display(path) {
  console.log(path);
}

module.exports = {
  find: pathfinding
};
