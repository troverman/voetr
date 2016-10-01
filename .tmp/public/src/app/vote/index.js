angular.module( 'voetr.vote', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'vote', {
		abstract: true,
		url: '/vote/:id',
		views: {
			"main": {
				templateUrl: 'vote/index.tpl.html'
			}
		},
		resolve: {
            vote: function(VoteModel, $stateParams) {
                return VoteModel.getOne($stateParams.id);
            }
        }
	})
    .state( 'vote.index', {
        url: '',
        views: {
            "vote": {
				controller: 'VoteCtrl',
                templateUrl: 'vote/index.tpl.html'
            }
        },
		resolve: {
            votes: function(VoteVoteModel, $stateParams, vote) {
                return VoteVoteModel.getByVote(vote.id);
            }
        }
    })

})

.controller( 'VoteCtrl', function VoteController( $scope, config, lodash, $sailsSocket, titleService, vote, votes) {
	titleService.setTitle(vote.title + '- voetr');
	$scope.vote = vote;
	$scope.votes = votes;
	console.log(votes)
});