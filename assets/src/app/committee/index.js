angular.module( 'voetr.committee', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'committee', {
        abstract: true,
		url: '/committee/:path',
		views: {
			"main": {
                controller: 'CommitteeCtrl',
				templateUrl: 'committee/index.tpl.html'
			}
		},
		resolve: {
            committee: ['$stateParams', 'CommitteeModel', function($stateParams, CommitteeModel) {
                return CommitteeModel.getByUrl($stateParams.path);
            }],
            billCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
                return CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id);
            }],
            committeeCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
                return CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id);
            }],
            postCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
                return CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id);
            }],
            voteCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
                return CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id);
            }],
        }
	})
    .state( 'committee.activity', {
        url: '',
        views: {
            "committeeActivity": {
                controller: 'CommitteeActivityCtrl',
                templateUrl: 'committee/templates/activity.tpl.html'
            }
        },
        resolve: {
            bills: ['committee', 'CommitteeBillModel', function(committee, CommitteeBillModel) {
                //return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
                return CommitteeBillModel.getSome(100, 0, 'createdAt DESC', {committee:committee.id});
                //return CommitteeBillModel.getByCommiteeAndChildren(100, 0, 'createdAt DESC', committee.id);
            }],
            posts: ['committee', 'PostModel', function(committee, PostModel) {
                return PostModel.getByCommittee(committee.id, 100, 0, 'createdAt desc');
            }],
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
         }
    })
    .state( 'committee.bills', {
        url: '/bills',
        views: {
            "committeeBills": {
                controller: 'CommitteeBillCtrl',
                templateUrl: 'committee/templates/bills.tpl.html'
            }
        },
        resolve: {
            bills: ['committee', 'CommitteeBillModel', function(committee, CommitteeBillModel) {
                //return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
                return CommitteeBillModel.getSome(100, 0, 'createdAt DESC', {committee:committee.id});
            }]
         }
    })
    .state( 'committee.committeeCommittees', {
        url: '/committees',
        views: {
            "committeeCommittees": {
                controller: 'CommitteeCommitteesCtrl',
                templateUrl: 'committee/templates/committees.tpl.html'
            }
        },
        resolve: {
            committees: ['committee', 'CommitteeModel', function(committee, CommitteeModel) {
                return CommitteeModel.getChildren(committee.id);
            }]
         }
    })
    .state( 'committee.discussion', {
        url: '/discussion',
        views: {
            "committeeDiscussion": {
                controller: 'CommitteeDiscussionCtrl',
                templateUrl: 'committee/templates/discussion.tpl.html'
            }
        },
        resolve: {
            posts: ['committee', 'PostModel', function(committee, PostModel) {
                return PostModel.getByCommittee(committee.id, 100, 0, 'createdAt DESC');
            }],
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }],
         }
    })
    .state( 'committee.members', {
        url: '/members',
        views: {
            "committeeMembers": {
                controller: 'CommitteeMemberCtrl',
                templateUrl: 'committee/templates/members.tpl.html'
            }
        },
        resolve: {
            members: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel) {
                return CommitteeMemberModel.getSome('committee', committee.id, 24, 0, 'createdAt DESC');
            }],
            memberCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
                return CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id);
            }]
         }
    })
    .state( 'committee.votes', {
        url: '/votes',
        views: {
            "committeeVotes": {
                controller: 'CommitteeVoteCtrl',
                templateUrl: 'committee/templates/votes.tpl.html'
            }
        },
        resolve: {
            votes: ['VoteModel', function(VoteModel) {
                return VoteModel.getSome(100, 0, 'voteCount DESC');
            }]
         }
    })

}])

.controller( 'CommitteeCtrl', ['$location', '$sailsSocket', '$scope', 'committee', 'CommitteeMemberModel', 'config', 'titleService', function CommitteeCtrl( $location, $sailsSocket, $scope, committee, CommitteeMemberModel, config, titleService) {
    $scope.committee = committee;
    $scope.currentUser = config.currentUser;
    titleService.setTitle(committee.title + ' | voetr');
    if (committee == undefined){$location.url('committees')};
    $scope.editCommitteeToggle = false;
    $scope.billCount = 0;
    $scope.newMember = {};
    $scope.voteCount = 0;

    $scope.createMember = function(){
        if($scope.currentUser){
            $scope.newMember.user = $scope.currentUser.id;
            $scope.newMember.committee = $scope.committee.id;
            $scope.newMember.title = 'Committee Member';
            CommitteeMemberModel.create($scope.newMember);
        }
        else{$location.path('/login')}
    };

    $scope.toggleEditCommittee = function(){
        $scope.editCommitteeToggle = $scope.editCommitteeToggle ? false : true;
    };

    $sailsSocket.subscribe('committee', function (envelope) {
        console.log(envelope)
        switch(envelope.verb) {
            case 'updated':
                if (envelope.data.committee == $scope.committee.id){
                    $scope.committee = envelope.data.committee;
                }
                break;
        }
    });

}])

.controller( 'CommitteeActivityCtrl', ['$location', '$scope', '$sailsSocket', '$stateParams', 'config', 'lodash', 'BillModel', 'bills', 'committee', 'CommitteeModel', 'PostModel', 'posts', 'ReactionModel', 'titleService', 'user', 'VoteVoteModel', function CommitteeHomeCtrl( $location, $scope, $sailsSocket, $stateParams, config, lodash, BillModel, bills, committee, CommitteeModel, PostModel, posts, ReactionModel, titleService, user, VoteVoteModel) {
    $scope.committee = committee;
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.posts = posts;
    $scope.user = user;
    $scope.newBill = {};
    $scope.newPost = {};
    $scope.newReaction = {};
    $scope.newVote = {};

    $scope.createPost = function(){
        if($scope.currentUser){
            $scope.newPost.user = $scope.currentUser.id;
            $scope.newPost.committee = $scope.committee.id
            PostModel.create($scope.newPost).then(function(model){
                $scope.newPost = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.createReaction = function(post, reaction, type){
        if($scope.currentUser){
            if (type == 'post'){$scope.newReaction.postModel = post.id;}
            if (type == 'bill'){$scope.newReaction.billModel = post.id;}
            $scope.newReaction.reaction = reaction;
            $scope.newReaction.user = $scope.currentUser.id;
            console.log($scope.newReaction)
            ReactionModel.create($scope.newReaction).then(function(){
                $scope.newReaction = {};
            });
        }
        else{$location.path('/login')}
    };

    $sailsSocket.subscribe('bill', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.bills.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.bills, {id: envelope.id});
                break;
        }
    });

    $sailsSocket.subscribe('vote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                BillModel.getSome(10,0, 'createdAt DESC').then(function(bills){
                    $scope.bills = bills;
                });
                break;
        }
    });

    $sailsSocket.subscribe('post', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.posts.unshift(envelope.data);
                break;
            case 'updated':
                var index = $scope.posts.map(function(obj){return obj.id}).indexOf(envelope.data.id);
                $scope.posts[index] = envelope.data;
                break;
            case 'destroyed':
                lodash.remove($scope.posts, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'CommitteeBillCtrl', ['$location', '$sailsSocket', '$scope', 'bills', 'committee', 'config', function CommitteeBillCtrl( $location, $sailsSocket, $scope, bills, committee, config) {
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.bills = bills;
    $scope.createBillToggle = false;

    $scope.toggleCreateBill = function(){
        $scope.createBillToggle = $scope.createBillToggle ? false : true;
    };

    $scope.createBill = function(newBill) {
        if($scope.currentUser){
            $scope.newBill.user = $scope.newBill.currentUser.id;
            $scope.newBill.committee = $scope.committee.id;
            BillModel.create(newBill).then(function(model) {
                $scope.newBill = {};
            });
        }
        else{$location.path('/login')}
    };

    $sailsSocket.subscribe('bill', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.bills.unshift(envelope.data);
                break;
            case 'destroyed':
                lodash.remove($scope.bills, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'CommitteeCommitteesCtrl', ['$location', '$sailsSocket', '$scope', 'committee', 'committees', 'config', function CommitteeBillCtrl($location, $sailsSocket, $scope, committee, committees, config) {
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.committees = committees;
    $scope.newCommittee = {};

    $scope.createCommittee = function() {
        if($scope.currentUser){
            $scope.newCommittee.user = $scope.currentUser.id;
            $scope.committee.parent = $scope.committee
            CommitteeModel.create($scope.newCommittee).then(function(model) {
                $scope.newCommittee = {};
            });
        }
        else{$location.path('/login')}
    };

}])

.controller( 'CommitteeDiscussionCtrl', ['$sailsSocket', '$scope', 'committee', 'config', 'PostModel', 'posts', 'ReactionModel', 'user', function CommitteeDiscussionCtrl( $sailsSocket, $scope, committee, config, PostModel, posts, ReactionModel, user) {
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.posts = posts;
    $scope.user = user;
    $scope.newPost = {};
    $scope.newReaction = {};

    $scope.createPost = function(){
        if($scope.currentUser){
            $scope.newPost.user = $scope.currentUser.id;
            $scope.newPost.committee = $scope.committee.id
            PostModel.create($scope.newPost).then(function(model){
                 $scope.newPost = {};
            });
        }
        else{$location.path('/login')}
    };

    $scope.createReaction = function(post, reaction){
        if($scope.currentUser){
            $scope.newReaction.postModel = post.id;
            $scope.newReaction.reaction = reaction;
            $scope.newReaction.user = $scope.currentUser.id;
            console.log($scope.newReaction)
            ReactionModel.create($scope.newReaction).then(function(){
                $scope.newReaction = {};
            });
        }
        else{$location.path('/login')}
    };

    $sailsSocket.subscribe('post', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.posts.unshift(envelope.data);
                break;
            case 'updated':
                var index = $scope.posts.map(function(obj){return obj.id}).indexOf(envelope.data.id);
                $scope.posts[index] = envelope.data;
                break;
            case 'destroyed':
                lodash.remove($scope.posts, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'CommitteeMemberCtrl', ['$sailsSocket', '$scope', 'committee', 'CommitteeMemberModel', 'config', 'memberCount', 'members', 'titleService', function CommitteeMemberCtrl( $sailsSocket, $scope, committee, CommitteeMemberModel, config, memberCount, members, titleService) {
    titleService.setTitle(committee.title + ' Members | voetr');
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.memberCount = memberCount.committeeMemberCount;
    $scope.members = members;
    $scope.newMember = {};
    $scope.skip = 0;

    $scope.loadMore = function() {
        $scope.skip = $scope.skip + 24;
        CommitteeMemberModel.getSome('committee', $scope.committee.id, 24, $scope.skip).then(function(members) {
            Array.prototype.push.apply($scope.members, members);
        });
    };

    $sailsSocket.subscribe('committeemember', function (envelope) {
        console.log(envelope)
        switch(envelope.verb) {
            case 'created':
                if (envelope.data.committee == $scope.committee.id){
                    $scope.members.unshift(envelope.data);
                }
                break;
            case 'destroyed':
                lodash.remove($scope.members, {id: envelope.id});
                break;
        }
    });

}])

.controller( 'CommitteeVoteCtrl', ['$location', '$scope', '$sailsSocket', 'committee', 'votes', 'VoteVoteModel', function CommitteeVoteCtrl( $location, $scope, $sailsSocket, committee, votes, VoteVoteModel ) {
    $scope.committee = committee;
    $scope.votes = votes;
    $scope.newVote = {};

    $scope.createVote = function(newVote, bill) {
        if ($scope.currentUser){
            $scope.newVote.bill = bill.id;
            $scope.newVote.user = config.currentUser.id;
            $scope.newVote.vote = newVote;
            VoteVoteModel.create($scope.newVote).then(function(model) {
                $scope.newVote = {};
            });
        }
        else{$location.path('/login')}
    };

    $sailsSocket.subscribe('vote', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if (envelope.data.committee == $scope.committee.id){
                    $scope.votes.unshift(envelope.data);
                }
                break;
            case 'destroyed':
                lodash.remove($scope.votes, {id: envelope.id});
                break;
        }
    });

}]);