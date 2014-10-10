'use strict';

module.exports = angular
  .module('boilerplate.ui', [
    'boilerplate.common',
    'boilerplate.data',
    'ui.bootstrap'
  ])
  .controller('HomeController', require('./controllers/home'))
;
