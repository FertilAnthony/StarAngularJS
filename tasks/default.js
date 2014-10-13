var util = require('gulp-util');
var config = require('./config');
var server = require('./server');
var lrserver = require('./live-reload');

module.exports = function() {
  // Start webserver
  server.listen(config.serverport);
  // Start live reload
  lrserver.listen(config.livereloadport);
  // Notify server is running
  util.log('Server is running  on: ' + util.colors.magenta('http://localhost:' + config.serverport));
};
