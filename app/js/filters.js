'use strict';

/* Filters */

angular.module('phonecatApp.phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
