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
			config: "config",
			constituents: function(RepresentativeModel, config) {
				if(config.currentUser){
                	return RepresentativeModel.getConstituents(config.currentUser);
            	}
            	else{return null}
            },
            representatives: function(RepresentativeModel, config) {
				if(config.currentUser){
                	return RepresentativeModel.getRepresentatives(config.currentUser);
                }
            	else{return null}
            },
			committees: function(CommitteeModel) {
				return CommitteeModel.getSome(10,0);
            },
			committeeCount: function(CommitteeModel) {
				return CommitteeModel.getCount();
            },
            users: function(UserModel){
				return UserModel.getSome(20,32);
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
			votes: function(VoteModel) {
				return VoteModel.getSome(100, 0, 'voteCount DESC');
            }
		}
	});
})

.controller( 'HomeCtrl', function HomeController($sailsSocket, $scope, $interval, titleService, config, bills, committees, users, userCount, committeeCount, billCount, VoteModel, VoteVoteModel, BillModel, CommitteeModel, UserModel, constituents, representatives, votes ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.users = users;
	$scope.userCount = userCount.userCount;
	$scope.constituents = constituents;
    $scope.representatives = representatives;
    $scope.votes = votes;

    if ($scope.currentUser){


    	$scope.newVote = {};

		VoteModel.getByUser($scope.currentUser.id).then(function(votes){
			console.log(votes)
			$scope.userVotes = votes;
		});

		$scope.createVote = function(voteInteger, newVote) {
	        if ($scope.currentUser == undefined){return null;}

	        $scope.newVote.user = config.currentUser.id;
	        $scope.newVote.bill = newVote.bill;
	        $scope.newVote.vote = newVote.id;
	        $scope.newVote.voteInteger = voteInteger;

			//set vote as voted with style.. --
			var index = $scope.votes.indexOf(newVote);
			if (voteInteger == 1){$scope.votes[index].class = 'upVote'}
			if (voteInteger == -1){$scope.votes[index].class = 'downVote'}

	        VoteVoteModel.create($scope.newVote).then(function(model) {
	            $scope.newVote = {};
	        });
	    }


	}



	$scope.skipBills = 10;
    $scope.loadMoreBills = function() {
		$scope.skipBills = $scope.skipBills + 20;
		BillModel.getSome(10,$scope.skipBills).then(function(bills) {
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

	$scope.skipMembers = 32;
    $scope.loadMoreMembers = function() {
		$scope.skipMembers = $scope.skipMembers + 20;
		UserModel.getSome(20,$scope.skipMembers).then(function(users) {
			Array.prototype.push.apply($scope.users, users);
		});
	};

	$sailsSocket.subscribe('bill', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.bills.unshift(envelope.data);
				BillModel.getCount().then(function(billCount){
					$scope.billCount = billCount.billCount;
	            });
	            break;
	        case 'destroyed':
	            lodash.remove($scope.bills, {id: envelope.id});
	            break;
	    }
    });

    $sailsSocket.subscribe('committee', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.committees.unshift(envelope.data);
				CommitteeModel.getCount().then(function(committeeCount){
					$scope.committeeCount = committeeCount.committeeCount;
	            });
	            break;
	        case 'destroyed':
	            lodash.remove($scope.committees, {id: envelope.id});
	            break;
	    }
    });

    $sailsSocket.subscribe('user', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.users.unshift(envelope.data);
	            UserModel.getCount().then(function(userCount){
					$scope.userCount = userCount.userCount;
	            });
	            break;
	        case 'destroyed':
	            lodash.remove($scope.users, {id: envelope.id});
	            break;
	    }
    });

    $sailsSocket.subscribe('vote', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.votes.unshift(envelope.data);
				//UserModel.getCount().then(function(userCount){
				//	$scope.userCount = userCount.userCount;
	            //});
	            break;
			case 'updated':
				var index = $scope.votes.map(function(obj){return obj.id}).indexOf(envelope.data[0].id);
				$scope.votes[index].voteCount = envelope.data[0].voteCount;
				break;
	        case 'destroyed':
	            lodash.remove($scope.votes, {id: envelope.id});
	            break;
	    }
    });


});
