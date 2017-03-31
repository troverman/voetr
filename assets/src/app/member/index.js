angular.module( 'voetr.member', [
])

.config(['$stateProvider', function config( $stateProvider ) {
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
            member: ['$stateParams', 'UserModel', function($stateParams, UserModel) {
                return UserModel.getByUsername($stateParams.path);
            }]
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
            constituents: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getConstituents(member);
            }],
            myRepresentatives: ['config', 'RepresentativeModel', function(config, RepresentativeModel) {
                if(config.currentUser){
                    return RepresentativeModel.getRepresentatives(config.currentUser);
                }
                else{return null}
            }],
            profilePosts: ['member', 'PostModel', function(member, PostModel) {
                return PostModel.getByProfile(member.id, 100, 0, 'createdAt DESC');
            }],
            userPosts: ['member', 'PostModel', function(member, PostModel) {
                return PostModel.getByUser(member.id, 100, 0, 'createdAt DESC');
            }],
            representatives: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getRepresentatives(member);
            }],
            votes: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getByUser(member.id, 25, 0, 'createdAt DESC');
            }],
            voteCount: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getUserCount(member.id);
            }],
            committees: ['CommitteeMemberModel', 'member', function(CommitteeMemberModel, member){
                return CommitteeMemberModel.getByMember(member.id);
            }]
        }
    });
}])

.controller( 'MemberCtrl', ['$location','$sailsSocket', '$scope', 'config', 'committees', 'constituents', 'member', 'myRepresentatives', 'PostModel', 'profilePosts', 'RepresentativeModel', 'representatives', 'titleService', 'userPosts', 'voteCount', 'votes', 'VoteVoteModel', function MemberController( $location, $sailsSocket, $scope, config, committees, constituents, member, myRepresentatives, PostModel, profilePosts, RepresentativeModel, representatives, titleService, userPosts, voteCount, votes, VoteVoteModel) {
	titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
	$scope.member = member;
	$scope.votes = votes;

    //sloppy
    $scope.posts = profilePosts.concat(userPosts);

    $scope.voteCount = voteCount.voteCount;
    $scope.following = votes;
    $scope.followers = votes;
    $scope.committees = committees;
    $scope.constituents = constituents;
    $scope.representatives = representatives;
    $scope.myRepresentatives = myRepresentatives;
    $scope.skip = 0;
    $scope.newPost = {};
    if(config.currentUser){
        $scope.isFollowing = $scope.myRepresentatives.filter(function(e){return e.representative.id == member.id}).length > 0
    }
    $scope.showFax = false;
    if (member.fax && member.fax != ','){$scope.showFax = true}
    
    $scope.createPost = function(){
        if($scope.currentUser){
            $scope.newPost.user = $scope.currentUser.id;
            $scope.newPost.profile = $scope.member.id
            PostModel.create($scope.newPost).then(function(model){
                $scope.newPost = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.selectAsRepresentative = function(){
        if($scope.currentUser){
            $scope.newRepresentative = {};
            $scope.newRepresentative.representative = $scope.member;
            $scope.newRepresentative.constituent = $scope.currentUser;
            RepresentativeModel.create($scope.newRepresentative).then(function(model) {
                $scope.newFollower = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.removeRepresentative = function(member) {
        if (member.user.id === $scope.currentUser.id) {
            RepresentativeModel.delete(member);
        }
    };

    $scope.loadMore = function() {
        $scope.skip = $scope.skip + 25;
        VoteVoteModel.getByUser($scope.member.id, 25, $scope.skip).then(function(committees) {
            Array.prototype.push.apply($scope.committees, committees);
            console.log($scope.committees);
        });
    };

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

}]);