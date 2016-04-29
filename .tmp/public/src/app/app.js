angular.module( 'voetr', [
    'ui.router',
    'sails.io',
    'angularMoment',
    'infinite-scroll',
    'duScroll',
    'lodash',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'templates-app',
    'services',
    'models',
    'ngMaterial',
    'voetr.sidebar',
    'voetr.about',
    'voetr.account',
    'voetr.bill',
    'voetr.bills',
    'voetr.committee',
    'voetr.committees',
    'voetr.home',
    'voetr.login',
    'voetr.member',
    'voetr.search',
    'voetr.register',
    'voetr.intro'

])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

    $urlRouterProvider.when('/about/', '/about');

    $urlRouterProvider.otherwise(function ($injector, $location) {
        if ($location.$$url === '/') {
            window.location = '/';
        }
        else {
            // pass through to let the web server handle this request
            window.location = $location.$$absUrl;
        }
    });

    $locationProvider.html5Mode(true);

})

.run( function run () {
    moment.locale('en');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
    config.currentUser = window.currentUser;
});