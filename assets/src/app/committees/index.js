angular.module( 'voetr.committees', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'committees', {
		url: '/committees',
		views: {
			"main": {
				controller: 'CommitteesCtrl',
				templateUrl: 'committees/index.tpl.html'
			}
		},
		resolve: {
            committees: function(CommitteeModel) {
                return CommitteeModel.getAll().then(function(models) {
                    return models;
                });
            }
        }
	});
	$urlRouterProvider.when('/committees/', '/committees');
})

.controller( 'CommitteesCtrl', function CommitteesController( $scope, $sailsSocket, lodash, titleService, config, CommitteeModel, committees) {
	titleService.setTitle('committees - voetr');
	$scope.newPost = {};
    $scope.committees = committees;
    $scope.currentUser = config.currentUser;

    $sailsSocket.subscribe('committee', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.committees.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.committees, {id: envelope.id});
	            break;
	    }
    });

	$scope.createCommittee = function(newCommittee) {
        //newPost.user = config.currentUser.id;
        CommitteeModel.create(newCommittee).then(function(model) {
            $scope.newCommittee = {};
        });
    };



	$scope.changeVote = function(vote, flag){
		$scope.vote = vote==flag?'None':flag;
	};

    $scope.upVote = function () {
        $scope.vote++;
    }

    $scope.downVote = function () {
        $scope.vote--;
    }

    $scope.vote = 0;


});









