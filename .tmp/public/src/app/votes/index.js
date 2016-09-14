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
            votes: function(BillModel) {
				return BillModel.getSome(100, 0, 'voteCount DESC');
            }
        }
	});
	$urlRouterProvider.when('/votes/', '/votes');
})

.controller( 'VotesCtrl', function VotesCtrl( $scope, $sailsSocket, lodash, titleService, config, BillModel, votes) {
	titleService.setTitle('votes - voetr');
	$scope.currentUser = config.currentUser;
    $scope.votes = votes;
	$scope.skip = 0;

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		console.log($scope.skip);
		BillModel.getSome(100,$scope.skip,'voteCount DESC').then(function(votes) {
			Array.prototype.push.apply($scope.votes, votes);
		});
	};


});









