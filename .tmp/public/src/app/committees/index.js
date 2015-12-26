angular.module( 'voetr.committees', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'committees', {
		url: '/committees',
		views: {
			"main": {
				controller: 'CommitteesCtrl',
				templateUrl: 'committees/index.tpl.html'
			}
		},
		resolve: {
            committees: function(CommitteeModel) {
				//return CommitteeModel.getSome(10,0);
				return CommitteeModel.getAll();

            }
        }
	});
	$urlRouterProvider.when('/committees/', '/committees');
})

.controller( 'CommitteesCtrl', function CommitteesController( $scope, $sailsSocket, lodash, titleService, config, CommitteeModel, committees) {
	titleService.setTitle('committees - voetr');
	$scope.newPost = {};
    $scope.committees = committees;
    $scope.currentUser = config.currentUser;
    $scope.skip = 0;

    $sailsSocket.subscribe('committee', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.committees.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.committees, {id: envelope.id});
	            break;
	    }
    });

    /*$scope.loadMore = function() {
		$scope.skip = $scope.skip + 10;
		CommitteeModel.getSome(10,$scope.skip).then(function(committees) {
			Array.prototype.push.apply($scope.committees, committees);
		});
	};*/

	$scope.createCommittee = function(newCommittee) {
        //newCommittee.user = config.currentUser.id;
        CommitteeModel.create(newCommittee).then(function(model) {
            $scope.newCommittee = {};
        });
    };

});









