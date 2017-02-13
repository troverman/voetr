angular.module( 'voetr.bill', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'bill', {
		abstract: true,
		url: '/bill/:id',
		views: {
			"main": {
				templateUrl: 'bill/index.tpl.html'
			}
		},
		resolve: {
            bill: function(BillModel, $stateParams) {
                return BillModel.getOne($stateParams.id).then(function(models) {
                    return models;
                });
            }
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
            comments: function(CommentModel, bill) {
                return CommentModel.getByBill(bill.id);
            },
            votes: function(VoteModel, bill) {
                return VoteModel.getByBill(bill.id);
            }
         }
    });

})

.controller( 'BillCtrl', function BillController( $location, $sce, $scope, config, lodash, $sailsSocket, titleService, BillModel, bill, comments, CommentModel, votes, VoteModel, VoteVoteModel ) {
	titleService.setTitle(bill.title + ' - voetr');
	$scope.bill = bill;
	$scope.newComment = {};
    $scope.newVote = {};
    $scope.votes = votes;
    $scope.comments = comments;
    $scope.currentUser = config.currentUser;
    $scope.billContent = $sce.trustAsHtml($scope.bill.fullText);
    console.log(bill)

    $scope.createComment = function(newComment) {
        newComment.user = config.currentUser;
        newComment.bill = bill;
        CommentModel.create(newComment).then(function(model) {
            $scope.newComment = {};
        });
    };

    $scope.createVote = function(voteInteger, newVote) {
        if ($scope.currentUser == undefined){$location.path('/register');}
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.bill = bill.id;
        $scope.newVote.vote = newVote.id;
        $scope.newVote.voteInteger = voteInteger;
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    }

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
                console.log(envelope.data)
	            $scope.comments.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.comments, {id: envelope.id});
	            break;
	    }
    });

});