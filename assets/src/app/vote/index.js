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
            },
             myRepresentatives: function(RepresentativeModel, config) {
                if(config.currentUser){
                    return RepresentativeModel.getRepresentatives(config.currentUser);
                }
                else{return null}
            },
        }
    })

})

.controller( 'VoteCtrl', function VoteController( $sailsSocket, $scope, config, lodash, $sailsSocket, titleService, vote, votes, VoteVoteModel, myRepresentatives) {
	titleService.setTitle(vote.title + '- voetr');
    $scope.currentUser = config.currentUser;
    $scope.newComment = {};
    $scope.newVote = {};
	$scope.vote = vote;
	$scope.votes = votes;
    $scope.yesVotes = votes.filter(function(obj){return obj.voteInteger == 1});
    $scope.noVotes = votes.filter(function(obj){return obj.voteInteger == -1});
    $scope.myRepresentatives = myRepresentatives;

	$scope.creatseVote = function(newVote) {
        if ($scope.currentUser == undefined){
            return null;
        }
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.bill = vote.bill;
        $scope.newVote.vote = vote.id;
        $scope.newVote.voteInteger = newVote;
        console.log($scope.newVote)
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    };

    $sailsSocket.subscribe('votevote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

});