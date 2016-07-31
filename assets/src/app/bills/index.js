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
				return BillModel.getSome(100, 0, 'voteCount DESC');
            }
        }
	});
	$urlRouterProvider.when('/bills/', '/bills');
})

.controller( 'BillsCtrl', function BillsCtrl( $scope, $sailsSocket, lodash, titleService, config, BillModel, bills) {
	titleService.setTitle('bills - voetr');
	$scope.currentUser = config.currentUser;
    $scope.bills = bills;
	$scope.skip = 0;

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		console.log($scope.skip);
		BillModel.getSome(100,$scope.skip,'voteCount DESC').then(function(bills) {
			Array.prototype.push.apply($scope.bills, bills);
		});
	};


});









