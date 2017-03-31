angular.module( 'voetr.bills', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'bills', {
		url: '/bills',
		views: {
			"main": {
				controller: 'BillsCtrl',
				templateUrl: 'bills/index.tpl.html'
			}
		},
		resolve: {
            bills: ['BillModel', function(BillModel) {
				return BillModel.getSome(50, 0, 'createdAt DESC');
            }]
        }
	});
}])

.controller( 'BillsCtrl', ['$rootScope', '$scope', '$sailsSocket', 'BillModel', 'bills', 'config', 'titleService',  function BillsCtrl( $rootScope, $scope, $sailsSocket, BillModel, bills, config, titleService) {
	titleService.setTitle('bills - voetr');
	$scope.currentUser = config.currentUser;
    $scope.bills = bills;
	$scope.skip = 0;
	$scope.sort = 'createdAt DESC';

	$scope.selectSort = function(sort){
		$scope.sort = sort;
		$rootScope.stateIsLoading = true;
		BillModel.getSome(50, $scope.skip, $scope.sort).then(function(bills) {
			$rootScope.stateIsLoading = false;
			$scope.bills = bills;
		});
	};

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 50;
		$rootScope.stateIsLoading = true;
		BillModel.getSome(50, $scope.skip, $scope.sort).then(function(bills) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.bills, bills);
		});
	};

}]);









