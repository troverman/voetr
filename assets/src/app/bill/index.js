angular.module( 'voetr.bill', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'bill', {
		url: '/bill/:id/:url',
		views: {
			"main": {
				controller: 'BillCtrl',
				templateUrl: 'bill/index.tpl.html'
			}
		},
		resolve: {
            bill: function(BillModel, $stateParams) {
                return BillModel.getOne($stateParams.path).then(function(models) {
                    return models;
                });
            }
        }
	});
})

.controller( 'BillCtrl', function BillController( $scope, titleService, BillModel, bill ) {
	titleService.setTitle('Bill - voetr');
	$scope.bill = bill;
});