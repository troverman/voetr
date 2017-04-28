angular.module( 'voetr.home', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html',
			}
		}
	})
    .state( 'home.intro', {
        url: '',
        views: {
            "homeIntro": {
				controller: 'IntroCtrl',
                templateUrl: 'home/templates/intro.tpl.html'
            }
        },
		resolve: {
			committees: ['CommitteeModel', function(CommitteeModel) {
				return CommitteeModel.getSome(10, 0, 'createdAt DESC');
            }],
			committeeCount: ['CommitteeModel', function(CommitteeModel) {
				return CommitteeModel.getCount();
            }],
            users: ['userCount', 'UserModel', function(userCount, UserModel){
            	var rand = Math.floor(Math.random() * (userCount.userCount + 1));
				return UserModel.getSome(33, rand);
            }],
            userCount: ['UserModel', function(UserModel){
				return UserModel.getCount();
            }],
            bills: ['BillModel', function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            }],
			billCount: ['BillModel', function(BillModel){
				return BillModel.getCount();
            }],
        }
    })
	.state( 'home.feed', {
        url: '',
        views: {
            "homeFeed": {
				controller: 'FeedCtrl',
                templateUrl: 'home/templates/feed.tpl.html'
            }
        },
		resolve: {
			constituents: ['config', 'RepresentativeModel',function(config, RepresentativeModel) {
				return RepresentativeModel.getConstituents(config.currentUser);
            }],
			posts: ['config', 'PostModel', function(config, PostModel) {
    			return PostModel.getByUser(config.currentUser.id, 100, 0, 'createdAt DESC');
            }],
            representatives: ['config', 'RepresentativeModel', function(config, RepresentativeModel) {
				return RepresentativeModel.getRepresentatives(config.currentUser);
            }],
			user: ['UserModel', function(UserModel){
				return UserModel.getMine();
        	}],
			userVotes: ['config', 'VoteVoteModel', function(config, VoteVoteModel){
				//return VoteVoteModel.getByUser(config.currentUser.id, 25, 0, 'createdAt DESC');
				//slow?
        	}],
			votes: ['config', 'VoteModel', function(config, VoteModel) {
				return VoteModel.getSome(25, 0, 'createdAt DESC');
            }],
        }
    })

}])

.controller( 'HomeCtrl', ['$scope', '$state', 'config', 'titleService', function HomeController( $scope, $state, config, titleService ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	if($scope.currentUser){$state.go('home.feed')}
 	else{$state.go('home.intro')}
}])
.controller( 'IntroCtrl', ['$rootScope', '$sailsSocket', '$scope', 'billCount', 'BillModel', 'bills', 'committeeCount', 'CommitteeModel', 'committees', 'config', 'RepresentativeModel', 'userCount', 'UserModel', 'users', function IntroController( $rootScope, $sailsSocket, $scope, billCount, BillModel, bills, committeeCount, CommitteeModel, committees, config, RepresentativeModel, userCount, UserModel, users ) {
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.userCount = userCount.userCount;
	$scope.users = users;
    $scope.officialRepresentatives = {};
    $scope.gettingRepresentatives = false;

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

    $scope.skipBills = 10;
    $scope.loadMoreBills = function() {
		$rootScope.stateIsLoading = true;
		$scope.skipBills = $scope.skipBills + 20;
		BillModel.getSome(10,$scope.skipBills,'createdAt DESC').then(function(bills) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.bills, bills);
		});
	};

	$scope.skipCommittees = 10;
    $scope.loadMoreCommittees = function() {
		$rootScope.stateIsLoading = true;
		$scope.skipCommittees = $scope.skipCommittees + 100;
		CommitteeModel.getSome(100,$scope.skipCommittees).then(function(committees) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.committees, committees);
		});
	};

	$scope.skipMembers = 33;
    $scope.loadMoreMembers = function() {
		$rootScope.stateIsLoading = true;
		$scope.skipMembers = $scope.skipMembers + 21;
		UserModel.getSome(33,$scope.skipMembers).then(function(users) {
			$rootScope.stateIsLoading = false;
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

}])
.controller( 'FeedCtrl', ['$rootScope', '$sailsSocket', '$scope', 'config', 'constituents', 'PostModel', 'posts', 'RepresentativeModel', 'representatives', 'Upload', 'user', 'userVotes', 'VoteModel', 'votes', 'VoteVoteModel', function FeedController( $rootScope, $sailsSocket, $scope, config, constituents, PostModel, posts, RepresentativeModel, representatives, Upload, user, userVotes, VoteModel, votes, VoteVoteModel ) {
	$scope.currentUser = config.currentUser;
	$scope.constituents = constituents;
	$scope.newPost = {};
	$scope.newVote = {};
	$scope.posts = posts;
    $scope.representatives = representatives;
    $scope.user = user;
    $scope.userVotes = userVotes
    $scope.votes = votes;

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

	$scope.uploadIdentification = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
                $scope.user.identificationUrl = response.data.amazonUrl;
                $scope.accountSave();
            },
            function(err){
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.identificationPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.accountSave = function(){
        $rootScope.stateIsLoading = true;
        UserModel.update($scope.user).then(function(){
       		$rootScope.stateIsLoading = false;
        });
    };

    $scope.createPost = function(){
		$scope.newPost.user = $scope.currentUser.id;
		$scope.newPost.profile = $scope.currentUser.id
		PostModel.create($scope.newPost).then(function(model){
			$scope.newPost = {};
		});
	};

	$scope.deletePost = function(post){
		$scope.newPost.id = post;
		PostModel.delete($scope.newPost).then(function(model){
			$scope.newPost = {};
		});
	};

	$scope.createVote = function(voteInteger, newVote) {
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

    $scope.skipVotes = 25;
    $scope.loadMoreVotes = function() {
    	$rootScope.stateIsLoading = true;
		$scope.skipVotes = $scope.skipVotes + 25;
		VoteModel.getSome(25,$scope.skipVotes).then(function(votes) {
			$rootScope.stateIsLoading = false;
			Array.prototype.push.apply($scope.votes, votes);
		});
	};

	/*
	var vm = this;
	vm.gmapsService = new google.maps.places.AutocompleteService();
	vm.search = search;

	function getResults(address) {
		var deferred = $q.defer();
		vm.gmapsService.getQueryPredictions({input: address}, function (data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	};

	function search(address) {
		var deferred = $q.defer();
		getResults(address).then(
			function (predictions) {
			var results = [];
			for (var i = 0, prediction; prediction = predictions[i]; i++) {
				results.push(prediction.description);
			}
			deferred.resolve(results);
		});
		return deferred.promise;
	};
	*/

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
				console.log($scope.votes[index])
				break;
	        case 'destroyed':
	            lodash.remove($scope.votes, {id: envelope.id});
	            break;
	    }
    });

}])