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
				return VoteModel.getSome(50, 0, 'voteCount DESC');
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

	$scope.createVote = function(voteInteger, newVote) {
        if ($scope.currentUser == undefined){$location.path('/register');}
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.bill = newVote.bill;
        $scope.newVote.vote = newVote.id;
        $scope.newVote.voteInteger = voteInteger;
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    };

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 50;
		$rootScope.stateIsLoading = true;
		VoteModel.getSome(50,$scope.skip,'voteCount DESC').then(function(votes) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

}]);









