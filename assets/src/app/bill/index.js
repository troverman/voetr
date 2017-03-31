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
            comments: ['bill', 'CommentModel', function(bill, CommentModel) {
                return CommentModel.getByBill(bill.id);
            }],
            posts: ['bill', 'PostModel', function(bill, PostModel) {
                return PostModel.getByBill(bill.id);
            }],
            votes: ['bill', 'VoteModel', function(bill, VoteModel) {
                return VoteModel.getByBill(bill.id);
            }]
         }
    });

}])

.controller( 'BillCtrl', ['$location', '$sailsSocket', '$sce', '$scope', 'bill', 'BillModel', 'CommentModel', 'comments', 'config', 'lodash', 'posts', 'seoService', 'titleService', 'VoteModel', 'votes', 'VoteVoteModel', function BillController( $location, $sailsSocket, $sce, $scope, bill, BillModel, CommentModel, comments, config, lodash, posts, seoService, titleService, VoteModel, votes, VoteVoteModel ) {
	titleService.setTitle(bill.title + ' - voetr');
    seoService.setDescription(bill.title);
    seoService.setKeywords('bill, voetr, votes, legislation');

	$scope.bill = bill;
	$scope.newComment = {};
    $scope.newPost = {};
    $scope.newVote = {};
    $scope.votes = votes;
    $scope.comments = comments;
    $scope.currentUser = config.currentUser;
    $scope.posts = posts;
    $scope.billContent = $sce.trustAsHtml($scope.bill.fullText);
    //console.log(bill)

    //post will replace comment ---
    $scope.createComment = function(newComment) {
        newComment.user = config.currentUser;
        newComment.bill = bill;
        CommentModel.create(newComment).then(function(model) {
            $scope.newComment = {};
        });
    };

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

    $sailsSocket.subscribe('vote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                //$scope.calculateSum();
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

    $sailsSocket.subscribe('comment', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.comments.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.comments, {id: envelope.id});
	            break;
	    }
    });

}]);