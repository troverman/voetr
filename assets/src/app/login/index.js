angular.module( 'voetr.login', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'login', {
		url: '/login',
		views: {
			"main": {
				controller: 'LoginCtrl',
				templateUrl: 'login/index.tpl.html'
			}
		}
	});
})

.controller( 'LoginCtrl', function LoginController( $location, $scope, titleService, config ) {
	titleService.setTitle('login - voetr');
	$scope.currentUser = config.currentUser;
	if ($scope.currentUser){$location.path('/')};
});
