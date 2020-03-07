var cssFilesToInject = [
  'styles/**/*.css',
  'bower_components/angular-material/angular-material.css',
  'bower_components/angular-google-places-autocomplete/src/autocomplete.css',
];

var jsFilesToInject = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/sails.io.js/dist/sails.io.js',
  'bower_components/angularSails/dist/ngsails.io.js',
  'bower_components/lodash/lodash.js',
  'bower_components/moment/moment.js',
  'bower_components/angular-moment/angular-moment.js',
  'bower_components/angular-scroll/angular-scroll.js',
  'bower_components/ngInfiniteScroll//build/ng-infinite-scroll.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/angular-material/angular-material.js',
  'bower_components/ng-file-upload/ng-file-upload.min.js',
  'bower_components/angular-google-places-autocomplete/src/autocomplete.js',

  // All of the rest of your app scripts
  'src/**/*.js'
];

module.exports.jsFilesToInjectNoPathChange = jsFilesToInject;

var templateFilesToInject = [
  // 'templates/**/*.html'
  'src/**/*.tpl.html'
];


module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {return '.tmp/public/' + path;});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {return '.tmp/public/' + path;});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) { return 'assets/' + path;});