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
			committeeCount: function(CommitteeModel) {
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

.controller( 'HomeCtrl', function HomeController($scope, $interval, titleService, config, bills, committees, users, userCount, committeeCount, billCount, VoteModel, BillModel, CommitteeModel, UserModel ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.users = users;
	$scope.userCount = userCount.userCount;

	$scope.skipBills = 10;
    $scope.loadMoreBills = function() {
		$scope.skipBills = $scope.skipBills + 20;
		BillModel.getSome(100,$scope.skipBills).then(function(bills) {
			Array.prototype.push.apply($scope.bills, bills);
		});
	};

	$scope.skipCommittees = 10;
    $scope.loadMoreCommittees = function() {
		$scope.skipCommittees = $scope.skipCommittees + 100;
		CommitteeModel.getSome(100,$scope.skipCommittees).then(function(committees) {
			Array.prototype.push.apply($scope.committees, committees);
		});
	};

	$scope.skipMembers = 33;
    $scope.loadMoreMembers = function() {
		$scope.skipMembers = $scope.skipMembers + 33;
		UserModel.getSome(100,$scope.skipMembers).then(function(users) {
			Array.prototype.push.apply($scope.users, users);
		});
	};

	if ($scope.currentUser){
		VoteModel.getByUser($scope.currentUser.id).then(function(votes){
			$scope.votes = votes;
		});
	}

});
