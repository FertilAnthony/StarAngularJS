var gulp = require('gulp');
var express = require('express');
var embedlr = require('gulp-embedlr');
var livereload = require('connect-livereload');
var config = require('./config');

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({
  port: config.livereloadport
}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(request, response) {
  response.sendFile('index.html', { root: 'dist' });
});

module.exports = server;
