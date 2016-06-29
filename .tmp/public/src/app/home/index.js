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
				console.log('committees')
				return CommitteeModel.getSome(10,0);
            },
			committeeCount: function(CommitteeModel) {
				console.log('committee count')
				return CommitteeModel.getCount();
            },
            users: function(UserModel){
				return UserModel.getSome(33,0);
            },
            userCount: function(UserModel){
				return UserModel.getCount();
            },
            bills: function(BillModel){
                return BillModel.getSome(10,0, 'createdAt DESC');
            },
			billCount: function(BillModel){
				return BillModel.getCount();
            },
		}
	});
})

.controller( 'HomeCtrl', function HomeController($scope, $interval, titleService, config, bills, committees, users, userCount, committeeCount, billCount, VoteModel ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.users = users;
	$scope.userCount = userCount.userCount;
	if ($scope.currentUser){
		VoteModel.getByUser($scope.currentUser.id).then(function(votes){
			$scope.votes = votes;
		});
	}

});
