angular.module( 'voetr.votes', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'votes', {
		url: '/votes',
		views: {
			"main": {
				controller: 'VotesCtrl',
				templateUrl: 'votes/index.tpl.html'
			}
		},
		resolve: {
            votes: function(VoteModel) {
				return VoteModel.getSome(100, 0, 'voteCount DESC');
            }
        }
	});
	$urlRouterProvider.when('/votes/', '/votes');
})

.controller( 'VotesCtrl', function VotesCtrl( $scope, $sailsSocket, lodash, titleService, config, votes, VoteModel, VoteVoteModel) {
	titleService.setTitle('votes - voetr');
	$scope.currentUser = config.currentUser;
    $scope.votes = votes;
    console.log(votes)
	$scope.skip = 0;

	$scope.createVote = function(voteInteger, newVote) {
        if ($scope.currentUser == undefined){
            return null;
        }
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.bill = newVote.bill;
        $scope.newVote.vote = newVote.id;
        $scope.newVote.voteInteger = voteInteger;
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    }

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		VoteModel.getSome(100,$scope.skip,'voteCount DESC').then(function(votes) {
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

});









