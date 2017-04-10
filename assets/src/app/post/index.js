angular.module( 'voetr.post', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'post', {
		url: '/post/:id',
		views: {
			"main": {
				controller: 'PostCtrl',
				templateUrl: 'post/index.tpl.html'
			}
		},
		resolve: {
            post: ['$stateParams', 'PostModel', function($stateParams, PostModel) {
                return PostModel.getOne($stateParams.id);
            }]
            //get nested posts
        }
	});
}])

.controller( 'PostCtrl', ['$scope', 'post', 'titleService', function PostController( $scope, post, titleService ) {
	titleService.setTitle('post - voetr');
	$scope.post = post;
}]);