angular.module( 'voetr.bill', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'bill', {
		abstract: true,
		url: '/bill/:id',
		views: {
			"main": {
				templateUrl: 'bill/index.tpl.html'
			}
		},
		resolve: {
            bill: ['$stateParams', 'BillModel', function($stateParams, BillModel) {
                return BillModel.getOne($stateParams.id);
            }]
        }
	})
    .state( 'bill.index', {
        url: '/:url',
        views: {
            "bill": {
				controller: 'BillCtrl',
                templateUrl: 'bill/index.tpl.html'
            }
        },
        resolve: {
            committees: ['bill', 'CommitteeBillModel', function(bill, CommitteeBillModel) {
                return CommitteeBillModel.getSome(100, 0, 'createdAt DESC', {bill:bill.id});
            }],
            posts: ['bill', 'PostModel', function(bill, PostModel) {
                return PostModel.getByBill(bill.id);
            }],
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
            votes: ['bill', 'VoteModel', function(bill, VoteModel) {
                return VoteModel.getByBill(bill.id);
            }]
         }
    });

}])

.controller( 'BillCtrl', ['$location', '$sailsSocket', '$sce', '$scope', 'bill', 'BillModel', 'committees', 'config', 'lodash', 'PostModel', 'posts', 'ReactionModel', 'seoService', 'titleService', 'user', 'VoteModel', 'votes', 'VoteVoteModel', function BillController( $location, $sailsSocket, $sce, $scope, bill, BillModel, committees, config, lodash, PostModel, posts, ReactionModel, seoService, titleService, user, VoteModel, votes, VoteVoteModel ) {
	titleService.setTitle(bill.title + ' - voetr');
    seoService.setDescription(bill.title);
    seoService.setKeywords('bill, voetr, votes, legislation');

	$scope.bill = bill;
    $scope.billContent = $sce.trustAsHtml($scope.bill.fullText);
    $scope.committees = committees;
    $scope.currentUser = config.currentUser;
    $scope.newPost = {};
    $scope.newReaction = {};
    $scope.newVote = {};
    $scope.posts = posts;
    $scope.user = user;
    $scope.votes = votes;

     $scope.createPost = function(){
        if($scope.currentUser){
            $scope.newPost.user = $scope.currentUser.id;
            $scope.newPost.bill = $scope.bill.id;
            PostModel.create($scope.newPost).then(function(model){
                $scope.newPost = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.createReaction = function(post, reaction){
        if($scope.currentUser){
            $scope.newReaction.postModel = post.id;
            $scope.newReaction.reaction = reaction;
            $scope.newReaction.user = $scope.currentUser.id;
            console.log($scope.newReaction)
            ReactionModel.create($scope.newReaction).then(function(){
                $scope.newReaction = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.createVote = function(voteInteger, newVote) {
        if ($scope.currentUser){
            $scope.newVote.user = config.currentUser.id;
            $scope.newVote.bill = bill.id;
            $scope.newVote.vote = newVote.id;
            $scope.newVote.voteInteger = voteInteger;
            VoteVoteModel.create($scope.newVote).then(function(model) {
                $scope.newVote = {};
            });
        }
        else{$location.path('/register');}
    };

    $sailsSocket.subscribe('post', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.posts.unshift(envelope.data);
                break;
            case 'updated':
                var index = $scope.posts.map(function(obj){return obj.id}).indexOf(envelope.data.id);
                $scope.posts[index] = envelope.data;
                break;
            case 'destroyed':
                lodash.remove($scope.posts, {id: envelope.id});
                break;
        }
    });

    $sailsSocket.subscribe('vote', function (envelope) {
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