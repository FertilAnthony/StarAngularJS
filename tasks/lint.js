var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var paths = require('./paths');
var handlers = require('./handlers');

// JSHint task
module.exports = function() {
  return gulp.src(paths.sources.scripts)
    // Catch errors
    .pipe(plumber({
      errorHandler: handlers.onGenericError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
};
