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
		}
	})
    .state( 'vote.index', {
        url: '',
        views: {
            "vote": {
				controller: 'VoteCtrl',
                templateUrl: 'vote/index.tpl.html'
            }
        }
    });

})

.controller( 'VoteCtrl', function VoteController( $scope, config, lodash, $sailsSocket, titleService ) {
	titleService.setTitle('VOTE - voetr');
});