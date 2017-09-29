angular.module( 'voetr', [
    'ui.router',
    'sails.io',
    'angularMoment',
    'infinite-scroll',
    'duScroll',
    'lodash',
    'ui.bootstrap',
    'google.places',
    'templates-app',
    'services',
    'models',
    'ngMaterial',
    'ngFileUpload',
    'voetr.about',
    'voetr.account',
    'voetr.bill',
    'voetr.bills',
    'voetr.committee',
    'voetr.committees',
    'voetr.footer',
    'voetr.home',
    'voetr.login',
    'voetr.member',
    'voetr.members',
    'voetr.nav',
    'voetr.post',
    'voetr.register',
    'voetr.search',
    'voetr.vote',
    'voetr.votes',
    'voetr.votevote',
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();
        var hasTrailingSlash = path[path.length-1] === '/';
        if(hasTrailingSlash) {
            var newPath = path.substr(0, path.length - 1); 
            return newPath; 
        } 
    });
    if (window.location.hash && window.location.hash == '#_=_') {
        window.location.hash = '';
    }
    $urlRouterProvider.otherwise(function ($injector, $location) {
        if ($location.$$url === '/') {window.location = '/';}
        else {window.location = $location.$$absUrl;}
    });
    $locationProvider.html5Mode(true);
}])
.run( function run () {
    moment.locale('en');
})
.controller( 'AppCtrl', ['$rootScope', '$scope', 'config', function AppCtrl ( $rootScope, $scope, config ) {
    config.currentUser = window.currentUser;
    //as oppossed to rendering it in the window... get it from the server with the state.. 
    //UserModel.getMine().then(function(user){
    //    console.log(user);
    //    config.currentUser = user;
    //});
    $rootScope.$on('$stateChangeStart',function(info, state){
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess',function(info, state){
        $rootScope.stateIsLoading = false;
    });
}])
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});