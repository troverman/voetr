angular.module( 'voetr.committee', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'committee', {
		url: '/committee/:path',
		views: {
			"main": {
				controller: 'CommitteeCtrl',
				templateUrl: 'committee/index.tpl.html'
			}
		},
		resolve: {
            bills: function(BillModel) {
                return BillModel.getAll().then(function(models) {
                    return models;
                });
            }
        }
	});
})

.controller( 'CommitteeCtrl', function CommitteeController( $scope, $sailsSocket, lodash, titleService, config, $stateParams, BillModel, bills) {

    $scope.committee = $stateParams.path;
	titleService.setTitle($stateParams.path + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.newBill = {};

    $sailsSocket.subscribe('committeebill', function (envelope) {
    	console.log('ok');
	    switch(envelope.verb) {
	        case 'created':
	            $scope.bills.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.bills, {id: envelope.id});
	            break;
	    }
    });

    $scope.createBill = function(newBill) {
        newBill.user = config.currentUser.id;
        BillModel.create(newBill).then(function(model) {
            $scope.newBill = {};
        });
    };






	$scope.changeVote = function(vote, flag){
		$scope.vote = vote==flag?'None':flag;
	};

    $scope.upVote = function () {
        $scope.vote++;
    }

    $scope.downVote = function () {
        $scope.vote--;
    }

    $scope.vote = 0;


});









