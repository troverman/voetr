angular.module( 'voetr.blog-post', [
])

.config(function config( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.when('/blog/', '/blog');
	$urlRouterProvider.when('/blog/:path/', '/blog/:path');

	$stateProvider.state( 'blog-post', {
		url: '/blog/:path',
		views: {
			"main": {
				controller: 'BlogPostCtrl',
				templateUrl: 'blog-post/index.tpl.html'
			}
		}
	});
})

.controller( 'BlogPostCtrl', function BlogPostController( $scope, titleService, $stateParams, $http) {
	titleService.setTitle('Blog - voetr'); 

	$scope.post_title = 'post title';
	$scope.post_content = 'post content';

	var url = $stateParams;


	$http.get('/api/post').
	    success(function(data, status, headers, config) {
	      $scope.posts = data;
	    }).
	    error(function(data, status, headers, config) {
      // log error
    });




});









