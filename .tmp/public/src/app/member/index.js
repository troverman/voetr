angular.module( 'voetr.member', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		abstract: true,
		url: '/member/:path',
        //url: '/:path', //---> would need to be loaded last
		views: {
			"main": {
                controller: 'MemberCtrl',
				templateUrl: 'member/index.tpl.html'
			}
		},
		resolve: {
            member: ['$stateParams', 'UserModel', function($stateParams, UserModel) {
                return UserModel.getByUsername($stateParams.path);
            }],
            committeeCount: ['member', 'CommitteeMemberModel', function(member, CommitteeMemberModel) {
                return CommitteeMemberModel.getCommitteeMemberCount('user', member.id);
            }],
            constituentCount: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getConstituentCount(member.id);
            }],
            myRepresentatives: ['config', 'RepresentativeModel', function(config, RepresentativeModel) {
                if(config.currentUser){return RepresentativeModel.getRepresentatives(config.currentUser);}
                else{return null}
            }],
            representativeCount: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getRepresentativeCount(member.id);
            }],
            voteCount: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getUserCount(member.id);
            }],
        }
	})
    .state( 'member.index', {
        url: '',
        views: {
            "memberActivity": {
				controller: 'MemberActivityCtrl',
                templateUrl: 'member/templates/activity.tpl.html'
            }
        },
		resolve: {
            profilePosts: ['member', 'PostModel', function(member, PostModel) {
                return PostModel.getByProfile(member.id, 100, 0, 'createdAt DESC');
            }],
            userPosts: ['member', 'PostModel', function(member, PostModel) {
                return PostModel.getByUser(member.id, 100, 0, 'createdAt DESC');
            }],
            representatives: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getRepresentatives(member.id);
            }],
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
            votes: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getByUser(member.id, 25, 0, 'createdAt DESC');
            }]
        }
    })
    .state( 'member.bills', {
        url: '/bills',
        views: {
            "memberBills": {
                controller: 'MemberBillsCtrl',
                templateUrl: 'member/templates/bills.tpl.html'
            }
        },
        resolve: {
            bills: ['BillModel', 'member', function(BillModel, member){
                return BillModel.getByMember(member.id);
            }]
        }
    })
    .state( 'member.committees', {
        url: '/committees',
        views: {
            "memberCommittees": {
                controller: 'MemberCommitteesCtrl',
                templateUrl: 'member/templates/committees.tpl.html'
            }
        },
        resolve: {
            committees: ['CommitteeMemberModel', 'member', function(CommitteeMemberModel, member){
                return CommitteeMemberModel.getSome('user', member.id, 25, 0);
            }],
            committeeCount: ['member', 'CommitteeMemberModel', function(member, CommitteeMemberModel) {
                return CommitteeMemberModel.getCommitteeMemberCount('user', member.id);
            }],
        }
    })
    .state( 'member.constituents', {
        url: '/constituents',
        views: {
            "memberConstituents": {
                controller: 'MemberConstituentsCtrl',
                templateUrl: 'member/templates/constituents.tpl.html'
            }
        },
        resolve: {
            constituents: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getConstituents(member.id);
            }],
            constituentCount: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getConstituentCount(member.id);
            }],
        }
    })
    .state( 'member.edit', {
        url: '/edit',
        views: {
            "memberEdit": {
                controller: 'MemberEditCtrl',
                templateUrl: 'member/templates/edit.tpl.html'
            }
        },
        resolve: {
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
        }
    })
    .state( 'member.representatives', {
        url: '/representatives',
        views: {
            "memberRepresentatives": {
                controller: 'MemberRepresentativesCtrl',
                templateUrl: 'member/templates/representatives.tpl.html'
            }
        },
        resolve: {
            representatives: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getRepresentatives(member.id);
            }],
            representativeCount: ['member', 'RepresentativeModel', function(member, RepresentativeModel) {
                return RepresentativeModel.getRepresentativeCount(member.id);
            }],
        }
    })
    .state( 'member.votes', {
        url: '/votes',
        views: {
            "memberVotes": {
                controller: 'MemberVotesCtrl',
                templateUrl: 'member/templates/votes.tpl.html'
            }
        },
        resolve: {
            votes: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getByUser(member.id, 25, 0, 'createdAt DESC');
            }],
            voteCount: ['member', 'VoteVoteModel', function(member, VoteVoteModel) {
                return VoteVoteModel.getUserCount(member.id);
            }],
        }
    });
}])

.controller( 'MemberCtrl', ['$location',  '$sailsSocket', '$scope', 'committeeCount', 'constituentCount', 'config', 'member', 'myRepresentatives', 'representativeCount', 'RepresentativeModel', 'voteCount', function CommitteeCtrl( $location, $sailsSocket, $scope, committeeCount, constituentCount, config, member, myRepresentatives, representativeCount, RepresentativeModel, voteCount) {
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.committeeCount = committeeCount.committeeMemberCount;
    $scope.constituentCount = constituentCount.constituentCount;
    $scope.myRepresentatives = myRepresentatives;
    $scope.representativeCount = representativeCount.representativeCount;
    $scope.voteCount = voteCount.voteCount;
    if(config.currentUser){$scope.isFollowing = $scope.myRepresentatives.filter(function(e){return e.representative.id == member.id}).length > 0}
    $scope.showFax = false;
    if (member.fax && member.fax != ','){$scope.showFax = true};

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

    $scope.removeRepresentative = function() {
        if ($scope.isFollowing) {
            RepresentativeModel.delete($scope.member);
        }
    };

    $sailsSocket.subscribe('user', function (envelope) {
        switch(envelope.verb) {
            case 'updated':
                if(envelope.data.member.id == member.id){
                    $scope.member.unshift(envelope.data)
                }
                break;
        }
    });

    $sailsSocket.subscribe('representative', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if(envelope.data.representative.id == member.id){
                    $scope.constituentCount = constituentCount.constituentCount + 1;
                    //RepresentativeModel.getRepresentativeCount(member.id).then(function(representativeCount){});
                }
                if(envelope.data.constituent.id == member.id){
                    $scope.representativeCount = representativeCount.representativeCount + 1;
                    //RepresentativeModel.getConstituentCount(member.id).then(function(constituentCount){});
                }
                break;
            case 'destroyed':
                if(envelope.data.representative.id == member.id){
                    $scope.constituentCount = constituentCount.constituentCount - 1; 
                }
                if(envelope.data.constituent.id == member.id){
                    $scope.representativeCount = representativeCount.representativeCount - 1;
                }
                break;
        }
    });

    //votevote --- voteCount
    //committeeMember -- committeeCount

}])

.controller( 'MemberActivityCtrl', ['$location', '$rootScope', '$sailsSocket', '$scope', 'config', 'member', 'PostModel', 'profilePosts', 'RepresentativeModel', 'titleService', 'user', 'userPosts', 'votes', 'VoteVoteModel', function MemberController( $location, $rootScope, $sailsSocket, $scope, config, member, PostModel, profilePosts, RepresentativeModel, titleService, user, userPosts, votes, VoteVoteModel) {
	titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
	$scope.member = member;
    $scope.user = user;
	$scope.votes = votes;

    //sloppy
    $scope.posts = profilePosts.concat(userPosts);


    $scope.reply = function(post){
        var index = $scope.posts.map(function(obj){return obj.id}).indexOf(post.id);
        $scope.posts[index].showReply = !$scope.posts[index].showReply
    };


    $scope.skip = 0;
    $scope.newPost = {};
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

    $scope.loadMore = function() {
        $rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        //Activity Model -- SearchModel? etc... --> prolly SearchByMember(member.id)
        VoteVoteModel.getByUser($scope.member.id, 25, $scope.skip).then(function(committees) {
            $rootScope.stateIsLoading = false;
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

    $sailsSocket.subscribe('votevote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.votes.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'MemberBillsCtrl', ['$rootScope', '$sailsSocket', '$scope', 'BillModel', 'bills', 'CommitteeMemberModel', 'config', 'member', 'titleService', function MemberController( $rootScope, $sailsSocket, $scope, CommitteeMemberModel, bills, CommitteeMemberModel, config, member, titleService ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.bills = bills;
    $scope.skip = 0;

    $scope.loadMore = function() {
        //$rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        //CommitteeMemberModel.getConstituents($scope.member.id, 25, $scope.skip).then(function(committees) {
        //    Array.prototype.push.apply($scope.committees, committees);
       // });
    };

    $sailsSocket.subscribe('committeemember', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.committees.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.committees, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'MemberCommitteesCtrl', ['$rootScope', '$sailsSocket', '$scope', 'committeeCount', 'CommitteeMemberModel', 'committees', 'config', 'member', 'titleService', function MemberController( $rootScope, $sailsSocket, $scope, committeeCount, CommitteeMemberModel, committees, config, member, titleService ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.committeeCount = committeeCount.committeeMemberCount;
    $scope.committees = committees;
    $scope.skip = 0;

    $scope.loadMore = function() {
        $rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        CommitteeMemberModel.getSome('user', $scope.member.id, 25, $scope.skip).then(function(committees) {
            $rootScope.stateIsLoading = false;
            Array.prototype.push.apply($scope.committees, committees);
        });
    };

    $sailsSocket.subscribe('committeemember', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.committees.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.committees, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'MemberConstituentsCtrl', ['$rootScope', '$sailsSocket', '$scope', 'config', 'constituentCount', 'constituents', 'member', 'RepresentativeModel', 'titleService', function MemberController( $rootScope, $sailsSocket, $scope, config, constituentCount, constituents, member, RepresentativeModel, titleService ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.constituentCount = constituentCount.constituentCount;
    $scope.constituents = constituents;
    $scope.skip = 0;

    $scope.loadMore = function() {
        $rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        RepresentativeModel.getConstituents($scope.member.id, 25, $scope.skip).then(function(constituents) {
            $rootScope.stateIsLoading = false;
            Array.prototype.push.apply($scope.constituents, constituents);
        });
    };

    //not final
    $sailsSocket.subscribe('representative', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if(envelope.data.representative.id == member.id){
                    $scope.constituents.unshift(envelope.data);
                }
                break;
            case 'destroyed':
                if(envelope.data.representative.id == member.id){
                    $scope.constituents.unshift(envelope.data);
                }
                break;
        }
    });

}])

.controller( 'MemberEditCtrl', ['$location', '$rootScope', '$sailsSocket', '$scope', 'config', 'member', 'titleService', 'Upload', 'user', 'UserModel', function MemberController( $location, $rootScope, $sailsSocket, $scope, config, member, titleService, Upload, user, UserModel ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;

    if (!$scope.currentUser){$location.path('/')};

    $scope.user = user;

    $scope.localPassport = $scope.user.passports.filter(function(e){return e.protocol == 'local'});
    $scope.facebookPassport = $scope.user.passports.filter(function(e){return e.provider == 'facebook'}).length>0;
    $scope.twitterPassport = $scope.user.passports.filter(function(e){return e.provider == 'twitter'}).length>0;
    $scope.googlePassport = $scope.user.passports.filter(function(e){return e.provider == 'google'}).length>0;

    $scope.uploadAvatar = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
                $scope.user.avatarUrl = response.data.amazonUrl;
                $scope.accountSave();
            },
            function(err){
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.avatarPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.uploadCover = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
                $scope.user.coverUrl = response.data.amazonUrl;
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
            },
            function(err){
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.coverPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
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

    $scope.removePassport = function(provider) {
        UserModel.removePassport(provider)
        .then(function(result) {
            $scope.user.passports = $scope.user.passports.filter(function(val, ind, arr) {
                return !(arr[ind].identifier === result[0].identifier);
            });
            $scope.facebookPassport = $scope.user.passports.filter(function(e){return e.provider == 'facebook'}).length>0;
            $scope.twitterPassport = $scope.user.passports.filter(function(e){return e.provider == 'twitter'}).length>0;
            $scope.googlePassport = $scope.user.passports.filter(function(e){return e.provider == 'google'}).length>0;
            $scope.user.socialAccounts[(result[0].provider).toString()] = {}
            //UserModel.update(user)
        });
    };

    $scope.hasSinglePassport = function() {
        return $scope.user.passports.length <= 1;
    }

    $scope.accountSave = function(){
        $rootScope.stateIsLoading = true;
        var model = {
            id: $scope.user.id,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            avatarUrl: $scope.user.avatarUrl,
            coverUrl: $scope.user.coverUrl,
            identificationUrl: $scope.user.identificationUrl,
            address: $scope.user.address,
        };
        UserModel.update(model).then(function(){
            $rootScope.stateIsLoading = false;
        });
    };




}])

.controller( 'MemberRepresentativesCtrl', ['$rootScope', '$sailsSocket', '$scope', 'config', 'member', 'representativeCount', 'RepresentativeModel', 'representatives', 'titleService', function MemberController( $rootScope, $sailsSocket, $scope, config, member, representativeCount, RepresentativeModel, representatives, titleService ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.representativeCount = representativeCount.representativeCount;
    $scope.representatives = representatives;
    $scope.skip = 0;

    $scope.loadMore = function() {
        $rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        RepresentativeModel.getRepresentatives($scope.member.id, 25, $scope.skip).then(function(representatives) {
            $rootScope.stateIsLoading = false;
            Array.prototype.push.apply($scope.representatives, representatives);
        });
    };

    $sailsSocket.subscribe('representative', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if(envelope.data.constituent.id == member.id){
                    $scope.constituents.unshift(envelope.data);
                }
                break;
            case 'destroyed':
                if(envelope.data.constituent.id == member.id){
                    $scope.constituents.unshift(envelope.data);
                }
                break;
        }
    });

}])

.controller( 'MemberVotesCtrl', ['$rootScope', '$sailsSocket', '$scope', 'config', 'member', 'titleService', 'voteCount', 'votes', 'VoteVoteModel', function MemberController( $rootScope, $sailsSocket, $scope, config, member, titleService, voteCount, votes, VoteVoteModel ) {
    titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.member = member;
    $scope.voteCount = voteCount.voteCount;
    $scope.votes = votes;
    $scope.skip = 0;

    $scope.loadMore = function() {
        $rootScope.stateIsLoading = true;
        $scope.skip = $scope.skip + 25;
        VoteVoteModel.getByUser($scope.member.id, 25, $scope.skip).then(function(votes) {
            $rootScope.stateIsLoading = false;
            Array.prototype.push.apply($scope.votes, votes);
        });
    };

    //not final
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

}])
