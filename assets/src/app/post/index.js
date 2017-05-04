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

.controller( 'PostCtrl', ['$location', '$sailsSocket', '$scope', 'config', 'post', 'PostModel', 'titleService', function PostController( $location, $sailsSocket, $scope, config, post, PostModel, titleService ) {
	titleService.setTitle('post - voetr');
	$scope.currentUser = config.currentUser;
	$scope.post = post;

	 $scope.createPost = function(){
	 	if($scope.currentUser){
			$scope.newPost.user = $scope.currentUser.id;
			$scope.newPost.postModel = $scope.post.id
			PostModel.create($scope.newPost).then(function(model){
				$scope.newPost = {};
			});
		}
		else{$location.path('/login')}
	};

	$sailsSocket.subscribe('post', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            //$scope.posts.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            //lodash.remove($scope.posts, {id: envelope.id});
	            break;
	    }
    });

}]);