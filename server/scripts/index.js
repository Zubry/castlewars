const manifest = require('./manifest.json');

module.exports = function(e) {
  manifest
    .forEach(path => require(`./${path}`)(e));
};
