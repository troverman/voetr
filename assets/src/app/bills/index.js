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
				return BillModel.getSome(100, 0, 'createdAt DESC');
            }
        }
	});
	$urlRouterProvider.when('/bills/', '/bills');
})

.controller( 'BillsCtrl', function BillsCtrl( $rootScope, $scope, $sailsSocket, lodash, titleService, config, BillModel, bills) {
	titleService.setTitle('bills - voetr');
	$scope.currentUser = config.currentUser;
    $scope.bills = bills;
	$scope.skip = 0;

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		$rootScope.stateIsLoading = true;
		BillModel.getSome(100,$scope.skip,'createdAt DESC').then(function(bills) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.bills, bills);
		});
	};


});









