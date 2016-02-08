angular.module( 'voetr.account', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AccountCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		}
	});
})

.controller( 'AccountCtrl', function AccountController( $scope, titleService, config ) {
	titleService.setTitle('Account - voetr');
	$scope.currentUser = config.currentUser;

});
