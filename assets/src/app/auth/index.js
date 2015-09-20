angular.module( 'voetr.auth', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/login',
		views: {
			"main": {
				controller: 'AuthCtrl',
				templateUrl: 'auth/index.tpl.html'
			}
		}
	});
})

.controller( 'AuthCtrl', function HomeController( $scope, titleService, config ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;

});
