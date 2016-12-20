const path = require('path');

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.sendfile(path.resolve(__dirname, '../client/index.html'));
  });

  app.get('/bundle.js', function (req, res) {
    res.sendfile(path.resolve(__dirname, '../client/bundle.js'));
  });
};
