angular.module( 'voetr.home', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			}
		},
		resolve:{
			constituents: ['config', 'RepresentativeModel',function(config, RepresentativeModel) {
				if(config.currentUser){return RepresentativeModel.getConstituents(config.currentUser);}
            	else{return null}
            }],
            representatives: ['config', 'RepresentativeModel', function(config, RepresentativeModel) {
				if(config.currentUser){return RepresentativeModel.getRepresentatives(config.currentUser);}
            	else{return null}
            }],
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
			votes: ['config', 'VoteModel', function(config, VoteModel) {
				if(config.currentUser){return VoteModel.getSome(25, 0, 'voteCount DESC')}
            	else{return null}
            }],
            user: ['config', 'UserModel', function(config, UserModel){
				if(config.currentUser){return UserModel.getMine();}
            	else{return null}
        	}],
		}
	});
}])

.controller( 'HomeCtrl', ['$rootScope', '$q', '$sailsSocket', '$scope', '$interval', 'billCount', 'BillModel', 'bills', 'committeeCount', 'CommitteeModel', 'committees', 'config', 'constituents', 'PostModel', 'RepresentativeModel', 'representatives', 'titleService', 'Upload', 'user', 'UserModel', 'userCount', 'users', 'VoteModel', 'votes', 'VoteVoteModel', function HomeController($rootScope, $q, $sailsSocket, $scope, $interval, billCount, BillModel, bills, committeeCount, CommitteeModel, committees, config, constituents, PostModel, RepresentativeModel, representatives, titleService, Upload, user, UserModel, userCount, users, VoteModel, votes, VoteVoteModel ) {
	titleService.setTitle('voetr');
	$scope.currentUser = config.currentUser;
	$scope.bills = bills;
	$scope.billCount = billCount.billCount;
	$scope.committees = committees;
	$scope.committeeCount = committeeCount.committeeCount;
	$scope.users = users;
	$scope.user = user;
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
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
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
        $scope.saving = true;
        var model = {
            id: $scope.user.id,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            avatarUrl: $scope.user.avatarUrl,
			coverUrl: $scope.user.coverUrl,
            identificationUrl: $scope.user.identificationUrl,
        };
        //console.log(model)
        return UserModel.update(model);
    };

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

	$scope.skipVotes = 25;
    $scope.loadMoreVotes = function() {
    	$rootScope.stateIsLoading = true;
		$scope.skipVotes = $scope.skipVotes + 25;
		VoteModel.getSome(25,$scope.skipVotes).then(function(votes) {
			$rootScope.stateIsLoading = false;
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

}]);
