angular.module( 'voetr.member', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		abstract: true,
		url: '/member/:path',
        //url: '/:path', //---> would need to be loaded last
		views: {
			"main": {
				templateUrl: 'member/index.tpl.html'
			}
		},
		resolve: {
            member: function(UserModel, $stateParams) {
                return UserModel.getByUsername($stateParams.path);
            }
        }
	})
    .state( 'member.index', {
        url: '',
        views: {
            "member": {
				controller: 'MemberCtrl',
                templateUrl: 'member/index.tpl.html'
            }
        },
		resolve: {
            constituents: function(RepresentativeModel, member) {
                return RepresentativeModel.getConstituents(member);
            },
            representatives: function(RepresentativeModel, member) {
                return RepresentativeModel.getRepresentatives(member);
            },
            votes: function(VoteVoteModel, member) {
                return VoteVoteModel.getByUser(member.id, 25, 0, 'createdAt desc');
            },
            voteCount: function(VoteVoteModel, member) {
                return VoteVoteModel.getUserCount(member.id);
            }
        }
    });
})

.controller( 'MemberCtrl', function MemberController( $sailsSocket, $scope, config, constituents, member, representatives, RepresentativeModel, titleService, voteCount, votes, VoteVoteModel ) {
	titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
	$scope.member = member;
	$scope.votes = votes;
    $scope.voteCount = voteCount.voteCount;
    $scope.following = votes;
    $scope.followers = votes;
    $scope.committees = votes;
    $scope.constituents = constituents;
    $scope.representatives = representatives;
    $scope.skip = 0;
    //$scope.isFollowing = $scope.myRepresentatives.filter(function(e){return e.representative.id == member.id}).length > 0

    $scope.selectAsRepresentative = function(){
        $scope.newRepresentative = {};
        $scope.newRepresentative.representative = $scope.member;
        $scope.newRepresentative.constituent = config.currentUser;
        RepresentativeModel.create($scope.newRepresentative).then(function(model) {
            $scope.newFollower = {};
        });
    };

    $scope.removeRepresentative = function(member) {
        // check here if this message belongs to the currentUser
        if (member.user.id === config.currentUser.id) {
            RepresentativeModel.delete(member).then(function(model) {
                // message has been deleted, and removed from $scope.messages
            });
        }
    };

    $scope.loadMore = function() {
        $scope.skip = $scope.skip + 25;
        VoteVoteModel.getByUser($scope.member.id, 25, $scope.skip).then(function(committees) {
            Array.prototype.push.apply($scope.committees, committees);
            console.log($scope.committees);
        });
    };

    $sailsSocket.subscribe('representative', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if(envelope.data.representative.id == member.id){
                    $scope.constituents.unshift(envelope.data);
                }
                if(envelope.data.constituent.id == member.id){
                    $scope.representatives.unshift(envelope.data);
                }
                break;
            case 'destroyed':
                lodash.remove($scope.representatives, {id: envelope.id});
                break;
        }
    });

    /*
    $sailsSocket.subscribe('user', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                //console.log(envelope.data);
                $scope.followers.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.followers, {id: envelope.id});
                break;
        }
    });
    */

    $sailsSocket.subscribe('votevote', function (envelope) {
        console.log(envelope)
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

});