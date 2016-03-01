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
				return UserModel.getSome(33,0);
            },
            bills: function(BillModel){
                return BillModel.getSome(10,0);
            }
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, $interval, titleService, config, bills, committees, users, VoteModel ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.committees = committees;
	$scope.users = users;

	if ($scope.currentUser){
		VoteModel.getByUser($scope.currentUser.id).then(function(votes){
			$scope.votes = votes;
		});
	}

});
