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
            }
         }
    });

})

.controller( 'BillCtrl', function BillController( $scope, config, $sailsSocket, titleService, BillModel, bill, comments, CommentModel ) {
	titleService.setTitle(bill.title + ' - voetr');
	$scope.bill = bill;
	$scope.newComment = {};
    $scope.newVote = {};
    $scope.comments = comments;
    $scope.currentUser = config.currentUser;

    $scope.createVote = function(newVote) {
        newVote.user = config.currentUser.id;
        newVote.bill = bill;
        VoteModel.create(newVote).then(function(model) {
            $scope.newVote = {};
        });
    }

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

	$scope.createComment = function(newComment) {
        newComment.user = config.currentUser.id;
        newComment.bill = bill;
        CommentModel.create(newComment).then(function(model) {
            $scope.newComment = {};
        });
    };
});