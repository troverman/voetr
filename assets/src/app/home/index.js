angular.module( 'voetr.home', [
])

.config(function config( $stateProvider, $urlMatcherFactoryProvider ) {
	//$urlMatcherFactoryProvider.strictMode(false);
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
				return CommitteeModel.getSome(10, 0, 'createdAt DESC');
            },
			committeeCount: function(CommitteeModel) {
				return CommitteeModel.getCount();
            },
            users: function(UserModel, userCount){
            	var rand = Math.floor(Math.random() * (userCount.userCount + 1));
				return UserModel.getSome(32, rand);
            },
            userCount: function(UserModel){
				return UserModel.getCount();
            },
            bills: function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            },
			billCount: function(BillModel){
				return BillModel.getCount();
            },
			votes: function(VoteModel) {
				return VoteModel.getSome(25, 0, 'voteCount DESC');
            }
		}
	});
})

.controller( 'HomeCtrl', function HomeController($rootScope, $sailsSocket, $scope, $interval, titleService, config, bills, committees, users, userCount, committeeCount, billCount, VoteModel, VoteVoteModel, BillModel, CommitteeModel, UserModel, constituents, representatives, votes, RepresentativeModel, PostModel, $q ) {
	titleService.setTitle('voetr - home');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.users = users;
	//console.log(users)
	$scope.userCount = userCount.userCount;
	$scope.constituents = constituents;
    $scope.representatives = representatives;
    $scope.votes = votes;
    $scope.officialRepresentatives = {};
    $scope.gettingRepresentatives = false;
    $scope.newVote = {};
    $scope.newPost = {};
    $scope.posts = {};

    /*var vm = this;
    vm.gmapsService = new google.maps.places.AutocompleteService();
    vm.search = search;

    function getResults(address) {
	  var deferred = $q.defer();
	  vm.gmapsService.getQueryPredictions({input: address}, function (data) {
	    deferred.resolve(data);
	  });
	  return deferred.promise;
	}

	function search(address) {
	  var deferred = $q.defer();
	  getResults(address).then(
	    function (predictions) {
	      var results = [];
	      for (var i = 0, prediction; prediction = predictions[i]; i++) {
	        results.push(prediction.description);
	      }
	      deferred.resolve(results);
	    }
	  );
	 return deferred.promise;
	}*/

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

    if ($scope.currentUser){

    	PostModel.getByUser($scope.currentUser.id, 100, 0, 'createdAt DESC').then(function(posts){
    		$scope.posts = posts;
    	});

		VoteVoteModel.getByUser($scope.currentUser.id, 25, 0, 'createdAt DESC').then(function(votes){
			$scope.userVotes = votes;
		});

    	$scope.createPost = function(){
    		console.log($scope.newPost);
    		$scope.newPost.user = $scope.currentUser.id;
    		$scope.newPost.profile = $scope.currentUser.id
    		PostModel.create($scope.newPost).then(function(model){
    			console.log(model);
    		})
    	};

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
	    };

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

	$scope.skipVotes = 25;
    $scope.loadMoreVotes = function() {
		$scope.skipVotes = $scope.skipVotes + 25;
		VoteModel.getSome(25,$scope.skipVotes).then(function(votes) {
			Array.prototype.push.apply($scope.votes, votes);
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
				$scope.votes[index].plusCount = envelope.data[0].plusCount;
				$scope.votes[index].minusCount = envelope.data[0].minusCount;
				break;
	        case 'destroyed':
	            lodash.remove($scope.votes, {id: envelope.id});
	            break;
	    }
    });


});
