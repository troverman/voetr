angular.module( 'voetr.vote', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'vote', {
		abstract: true,
		url: '/vote/:id',
		views: {
			"main": {
				templateUrl: 'vote/index.tpl.html'
			}
		},
		resolve: {
            vote: ['$stateParams', 'VoteModel', function($stateParams, VoteModel) {
                return VoteModel.getOne($stateParams.id);
                //BillVoteModel.getOne($stateParams.id);
            }]
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
        }
    })

}])

.controller( 'VoteCtrl', ['$location', '$sailsSocket', '$scope', 'config', 'lodash', 'myRepresentatives', 'PostModel', 'posts', 'titleService', 'vote', 'votes', 'VoteVoteModel', function VoteController( $location, $sailsSocket, $scope, config, lodash, myRepresentatives, PostModel, posts, titleService, vote, votes, VoteVoteModel) {
	titleService.setTitle(vote.title + '- voetr');
    $scope.currentUser = config.currentUser;
    $scope.noVotes = votes.filter(function(obj){return obj.voteInteger == -1});
    $scope.myRepresentatives = myRepresentatives;
    $scope.newPost = {};
    $scope.newVote = {};
    $scope.posts = posts
	$scope.vote = vote;
	$scope.votes = votes;
    $scope.yesVotes = votes.filter(function(obj){return obj.voteInteger == 1});

	$scope.createVote = function(newVote) {
        if ($scope.currentUser){
            $scope.newVote.user = config.currentUser.id;
            $scope.newVote.bill = vote.bill;
            $scope.newVote.vote = vote.id;
            $scope.newVote.voteInteger = newVote;
            console.log($scope.newVote)
            VoteVoteModel.create($scope.newVote).then(function(model) {
                $scope.newVote = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.createPost = function(){
        if($scope.currentUser){
            $scope.newPost.user = $scope.currentUser.id;
            $scope.newPost.vote = $scope.vote.id;
            PostModel.create($scope.newPost).then(function(model){
                $scope.newPost = {};
            });
        }
        else{$location.path('/login')}
    };

    /*$sailsSocket.subscribe('post', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });*/

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

}]);