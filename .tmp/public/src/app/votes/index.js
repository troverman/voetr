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
				return VoteModel.getSome(100, 0, 'createdAt DESC');
            }
        }
	});
	$urlRouterProvider.when('/votes/', '/votes');
})

.controller( 'VotesCtrl', function VotesCtrl( $scope, $sailsSocket, lodash, titleService, config, VoteModel, votes) {
	titleService.setTitle('votes - voetr');
	$scope.currentUser = config.currentUser;
    $scope.votes = votes;
    console.log(votes)
	$scope.skip = 0;

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		VoteModel.getSome(100,$scope.skip,'createdAt DESC').then(function(votes) {
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

});









