angular.module( 'voetr.committee', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'committee', {
		url: '/committee',
		views: {
			"main": {
				controller: 'CommitteeCtrl',
				templateUrl: 'committee/index.tpl.html'
			}
		},
		resolve: {
			posts: function(PostModel) {
            	return PostModel.getAll().then(function(models) {
                	return models;
            	});
        	}
		}
	});
	$urlRouterProvider.when('/committee/', '/committee');
})

.controller( 'CommitteeCtrl', function CommitteeController( $scope, $sailsSocket, lodash, titleService, config, PostModel, posts) {
	titleService.setTitle('committee - voetr');
	$scope.newPost = {};
    $scope.posts = posts;
    $scope.currentUser = config.currentUser;

   	$scope.test_posts = {
   		"voetr": {
	        "title": "United States of America",
	        "post_content": "",
	        "url_title": "united-states-of-america"
    	},
    	"voetr": {
	        "title": "North Carolina",
	        "post_content": "",
	        "url_title": "north-carolina"
    	},
    	"voetr": {
	        "title": "Illinois",
	        "post_content": "",
	        "url_title": "illinois"
    	}

    };


    $sailsSocket.subscribe('post', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.posts.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.posts, {id: envelope.id});
	            break;
	    }
    });

    $scope.destroyMessage = function(post) {
        // check here if this post belongs to the currentUser
        if (post.user.id === config.currentUser.id) {
            PostModel.delete(post).then(function(model) {
                // post has been deleted, and removed from $scope.messages
            });
        }
    };

	$scope.createPost = function(newPost) {
        //newPost.user = config.currentUser.id;
        PostModel.create(newPost).then(function(model) {
            $scope.newPost = {};
        });
        console.log(newPost);
    };

});









