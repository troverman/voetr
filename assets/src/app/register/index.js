angular.module( 'voetr.register', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'register', {
		url: '/register',
		views: {
			"main": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/index.tpl.html'
			}
		}
	});
}])

.controller( 'RegisterCtrl', ['$location', '$scope', 'config', 'titleService', function RegisterController( $location, $scope, config, titleService ) {
	titleService.setTitle('register | voetr');
	$scope.currentUser = config.currentUser;
	if ($scope.currentUser){$location.path('/')};
}]);
