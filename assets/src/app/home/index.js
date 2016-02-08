angular.module( 'voetr.home', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			}
		},
		resolve:{
			committees: function(CommitteeModel) {
				return CommitteeModel.getSome(10,0);
            },
            users: function(UserModel){
				return UserModel.getAll();
            }
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, $interval, titleService, config, committees, users, VoteModel ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.committees = committees;
	$scope.users = users;

	$scope.Time = 0;
	$scope.posts = [
    	{ title: 'post-1', time: 0},
    	{ title: 'post-2', time: 0},
    	{ title: 'post-3', time: 0}

	];

	$scope.mouseDown = function(post) {
		$scope.post = post;
		promise = $interval(function () { 
        	$scope.Time = $scope.Time + 1; 
			console.log($scope.Time);
			post.Time = $scope.Time;
        }, 100);
		console.log('mouse-down');
	};

	$scope.mouseUp = function (post) {
		$scope.post = post;
		if (promise){$interval.cancel(promise);}
		$scope.Time = 0; 
		console.log('mouse-up');
		console.log($scope.post);
	};
	if ($scope.currentUser){
		VoteModel.getByUser($scope.currentUser.id).then(function(votes){
			$scope.votes = votes;
		});
	}




});
