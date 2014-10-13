var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var paths = require('./paths');

module.exports = function() {
  return gulp.src(paths.dist.root, { read: false })
    .pipe(rimraf({ force: true }));
};
