angular.module( 'voetr.bills', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'bills', {
		url: '/bills',
		views: {
			"main": {
				controller: 'BillsCtrl',
				templateUrl: 'bills/index.tpl.html'
			}
		},
		resolve: {
            bills: function(BillModel) {
				return BillModel.getSome(100,0);
            }
        }
	});
	$urlRouterProvider.when('/bills/', '/bills');
})

.controller( 'BillsCtrl', function BillsCtrl( $scope, $sailsSocket, lodash, titleService, config, CommitteeModel, bills) {
	titleService.setTitle('bills - voetr');
	$scope.currentUser = config.currentUser;
    $scope.bills = bills;
});









