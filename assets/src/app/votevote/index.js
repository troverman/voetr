angular.module( 'voetr.votevote', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'votevote', {
		abstract: true,
		url: '/votevote/:id',
		views: {
			"main": {
				templateUrl: 'votevote/index.tpl.html'
			}
		},
		resolve: {
            vote: ['$stateParams', 'VoteModel', function($stateParams, VoteModel) {
                return VoteModel.getOne($stateParams.id);
                //BillVoteModel.getOne($stateParams.id);
            }]
        }
	})
    .state( 'votevote.index', {
        url: '',
        views: {
            "vote": {
				controller: 'VoteVoteCtrl',
                templateUrl: 'votevote/index.tpl.html'
            }
        },
		resolve: {
            results: ['vote', 'VoteModel', function(vote, VoteModel) {
                return VoteModel.getActivity(100, 0, 'createdAt DESC', vote.id);  
            }],
            votes: ['$stateParams', 'vote', 'VoteVoteModel', function($stateParams, vote, VoteVoteModel) {
                return VoteVoteModel.getByVote(vote.id);
            }],
            posts: ['PostModel', 'vote', function(PostModel, vote) {
                return PostModel.getByVote(vote.id);
            }],
            myRepresentatives: ['config', 'RepresentativeModel', function(config, RepresentativeModel) {
                if(config.currentUser){return RepresentativeModel.getRepresentatives(config.currentUser)}
                else{return null}
            }],
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
        }
    })

}])

.controller( 'VoteVoteCtrl', ['$location', '$sailsSocket', '$scope', 'config', 'lodash', 'myRepresentatives', 'PostModel', 'posts', 'results', 'titleService', 'user', 'vote', 'votes', 'VoteVoteModel', function VoteController( $location, $sailsSocket, $scope, config, lodash, myRepresentatives, PostModel, posts, results, titleService, user, vote, votes, VoteVoteModel) {
	titleService.setTitle(vote.title + ' | voetr');

    $sailsSocket.subscribe('votevote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                $scope.noVotes = $scope.votes.filter(function(obj){return obj.voteInteger == -1});
                $scope.yesVotes = $scope.votes.filter(function(obj){return obj.voteInteger == 1});
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

}]);