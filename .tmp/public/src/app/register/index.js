angular.module( 'voetr.register', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'register', {
		url: '/register',
		views: {
			"main": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/index.tpl.html'
			}
		}
	});
})

.controller( 'RegisterCtrl', function RegisterController( $scope, titleService, config ) {
	titleService.setTitle('register - voetr');
	$scope.currentUser = config.currentUser;
});
