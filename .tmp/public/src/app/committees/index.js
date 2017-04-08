angular.module( 'voetr.committees', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'committees', {
		url: '/committees',
		views: {
			"main": {
				controller: 'CommitteesCtrl',
				templateUrl: 'committees/index.tpl.html'
			}
		},
		resolve: {
            committees: ['CommitteeModel', function(CommitteeModel) {
				return CommitteeModel.getSome(100,0, 'createdAt DESC');
            }]
        }
	});
}])

.controller( 'CommitteesCtrl', ['$rootScope', '$scope', '$sailsSocket', 'CommitteeModel', 'committees', 'config', 'lodash', 'titleService', function CommitteesController( $rootScope, $scope, $sailsSocket, CommitteeModel, committees, config, lodash, titleService) {
	titleService.setTitle('committees - voetr');
    $scope.committees = committees;
    $scope.currentUser = config.currentUser;
    $scope.newCommittee = {};
    $scope.skip = 0;
	$scope.sort = 'createdAt DESC';

	$scope.selectSort = function(sort){
		$scope.sort = sort;
		$rootScope.stateIsLoading = true;
		CommitteeModel.getSome(50, $scope.skip, $scope.sort).then(function(committees) {
			$rootScope.stateIsLoading = false;
			$scope.committees = committees;
		});
	};

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		$rootScope.stateIsLoading = true;
		CommitteeModel.getSome(100,$scope.skip).then(function(committees) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.committees, committees);
		});
	};

	$scope.createCommittee = function() {
        $scope.newCommittee.user = config.currentUser.id;
        CommitteeModel.create($scope.newCommittee).then(function(model) {
            $scope.newCommittee = {};
        });
    };

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

}]);









