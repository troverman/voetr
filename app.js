/**
 * app.js
 *
 */
// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

// Ensure a "sails" can be located:
(function() {
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    console.log(e)
    return;
  }
  var express = require('express');
  var app = express();
  app.get('/.well-known/acme-challenge/26yeRHjK-mgWP_Uz4bZP6OsQ-fslBu14HN9WCkfu5zo', function(req, res) {
    res.send('26yeRHjK-mgWP_Uz4bZP6OsQ-fslBu14HN9WCkfu5zo.yMz-EAV5agQah1zn-w6Aqp0JVzxv1jmSFH6dh5Ea9uI')
  });

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      rc = function () { return {}; };
    }
  }

  // Start server
  sails.lift(rc('sails'));
})();
