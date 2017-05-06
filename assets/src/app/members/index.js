angular.module( 'voetr.members', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'members', {
		url: '/members',
		views: {
			"main": {
				controller: 'VotesCtrl',
				templateUrl: 'members/index.tpl.html'
			}
		},
		resolve: {
            members: ['VoteModel', function(VoteModel) {
				return VoteModel.getSome(20, 0, 'createdAt DESC');
				////BillVote
            }]
        }
	});
}])

.controller( 'VotesCtrl', ['$location', '$rootScope', '$scope', '$sailsSocket', 'config', 'titleService', 'VoteModel', 'votes', 'VoteVoteModel', function VotesCtrl( $location, $rootScope, $scope, $sailsSocket, config, titleService, VoteModel, votes, VoteVoteModel) {
	titleService.setTitle('members - voetr');
	$scope.currentUser = config.currentUser;
	$scope.newVote = {};
	$scope.skip = 0;
    $scope.members = members;
    $scope.sort = 'voteCount DESC';
	$scope.sortText = {'trendingScore DESC':'Trending','createdAt DESC':'Most Recent', 'voteCount DESC': 'Most Votes'}

    $scope.selectSort = function(sort){
		$scope.sort = sort;
		$rootScope.stateIsLoading = true;
		//BillVote
		VoteModel.getSome(50, $scope.skip, $scope.sort).then(function(votes) {
			$rootScope.stateIsLoading = false;
			$scope.votes = votes;
		});
	};

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 50;
		$rootScope.stateIsLoading = true;
		//BillVote
		VoteModel.getSome(50,$scope.skip, $scope.sort).then(function(votes) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

}]);









