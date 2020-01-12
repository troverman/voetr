angular.module( 'voetr.members', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'members', {
		url: '/members',
		views: {
			"main": {
				controller: 'MembersCtrl',
				templateUrl: 'members/index.tpl.html'
			}
		},
		resolve: {
			userCount: ['UserModel', function(UserModel){
				return UserModel.getCount();
            }],
            users: ['UserModel', function(UserModel){
				return UserModel.getSome(33, 0, 'constituentCount DESC');
            }],
        }
	});
}])

.controller( 'MembersCtrl', ['$location', '$rootScope', '$scope', '$sailsSocket', 'config', 'RepresentativeModel', 'titleService', 'UserModel', 'users', function MembersCtrl( $location, $rootScope, $scope, $sailsSocket, config, RepresentativeModel, titleService, UserModel, users) {
	titleService.setTitle('members | voetr');
	$scope.currentUser = config.currentUser;
	$scope.skip = 0;
    $scope.users = users;
    $scope.sort = 'createdAt DESC';
	$scope.sortText = {'trendingScore DESC':'Trending','createdAt DESC':'Most Recent', 'voteCount DESC': 'Most Votes'};

	$scope.getLatLng = function() {
	    if (navigator.geolocation) {
	    	$scope.gettingRepresentatives = true;
	    	$rootScope.stateIsLoading = true;
	        navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude; 
                lng = position.coords.longitude;
	        	RepresentativeModel.getByLocation(lat, lng).then(function(representatives){
	        		$scope.officialRepresentatives = representatives;
	        		$rootScope.stateIsLoading = false;
					$scope.gettingRepresentatives = false;
	        	});
	        });
	    }
	};

    $scope.selectSort = function(sort){
		$scope.sort = sort;
		$rootScope.stateIsLoading = true;
		UserModel.getSome(50, $scope.skip, $scope.sort).then(function(votes) {
			$rootScope.stateIsLoading = false;
			$scope.votes = votes;
		});
	};

    $scope.loadMore = function() {
		$rootScope.stateIsLoading = true;
		$scope.skip = $scope.skip + 21;
		UserModel.getSome(33, $scope.skip).then(function(users) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.users, users);
		});
	};

}]);









