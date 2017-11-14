angular.module( 'voetr.votes', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'votes', {
		url: '/votes',
		views: {
			"main": {
				controller: 'VotesCtrl',
				templateUrl: 'votes/index.tpl.html'
			}
		},
		resolve: {
            votes: ['VoteModel', function(VoteModel) {
				return VoteModel.getSome(10, 0, 'createdAt DESC');
				////BillVote
            }]
        }
	});
}])

.controller( 'VotesCtrl', ['$location', '$rootScope', '$scope', '$sailsSocket', 'config', 'titleService', 'VoteModel', 'votes', 'VoteVoteModel', function VotesCtrl( $location, $rootScope, $scope, $sailsSocket, config, titleService, VoteModel, votes, VoteVoteModel) {
	titleService.setTitle('votes - voetr');
	$scope.currentUser = config.currentUser;
	$scope.newVote = {};
	$scope.skip = 0;
    $scope.votes = votes;
    $scope.sort = 'voteCount DESC';
	$scope.sortText = {'trendingScore DESC':'Trending','createdAt DESC':'Most Recent', 'voteCount DESC': 'Most Votes'}

	$scope.createVote = function(voteInteger, newVote) {
        if ($scope.currentUser){
	        $scope.newVote.user = config.currentUser.id;
	        $scope.newVote.bill = newVote.bill;
	        $scope.newVote.vote = newVote.id;
	        $scope.newVote.voteInteger = voteInteger;
	        VoteVoteModel.create($scope.newVote).then(function(model) {
	            $scope.newVote = {};
	        });
    	}
		else{$location.path('/register');}

    };

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
		$scope.skip = $scope.skip + 10;
		$rootScope.stateIsLoading = true;
		//BillVote
		VoteModel.getSome(10,$scope.skip, $scope.sort).then(function(votes) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

}]);









