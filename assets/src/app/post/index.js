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
            }],
           	postChildren:['post', 'PostModel', function(post, PostModel) {
                return PostModel.getByPost(post.id);
            }],
            //get nested posts
        }
	});
}])

.controller( 'PostCtrl', ['$location', '$sailsSocket', '$scope', 'config', 'post', 'postChildren', 'PostModel', 'titleService', function PostController( $location, $sailsSocket, $scope, config, post, postChildren, PostModel, titleService ) {
	titleService.setTitle('post - voetr');
	$scope.currentUser = config.currentUser;
	$scope.post = post;
	$scope.postChildren = postChildren;

	console.log($scope.postChildren)

	 $scope.createPost = function(){
	 	if($scope.currentUser){
			$scope.post.newPost.user = $scope.currentUser.id;
			$scope.post.newPost.postModel = $scope.post.id;
			PostModel.create($scope.post.newPost).then(function(model){
				$scope.post.newPost = {};
			});
		}
		else{$location.path('/login')}
	};

	
	$scope.getPostChildren = function(post){
		PostModel.getByPost(post).then(function(postModels){
			//$scope.post.postChilren = postModels;


			for (x in postModels){
				//post children needs to be mapped recursivly.....
				var index = $scope.postChildren.map(function(obj){return obj.id}).indexOf(post);
				if (index != -1){
					$scope.postChildren[index].children = [];
					$scope.postChildren[index].children.push(postModels[x]);
					console.log()
					console.log(index)
					console.log($scope.postChildren)

					$scope.getPostChildren(postModels[x].id);
				}
			}


		});

	};

	for (x in postChildren){
		$scope.getPostChildren($scope.postChildren[x].id);
	}

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