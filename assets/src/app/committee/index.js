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
            memberCount: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel){
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
            bills: ['BillModel', 'committee', function(BillModel, committee) {
                return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
            }],
            posts: ['committee', 'PostModel', function(committee, PostModel) {
                return PostModel.getByCommittee(committee.id, 100, 0, 'createdAt desc');
            }]
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
            bills: ['committee', 'BillModel', function(committee, BillModel) {
                return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
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
                return PostModel.getByCommittee(committee.id, 100, 0, 'createdAt desc');
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
                return CommitteeMemberModel.getSome('committee', committee.id, 24, 0);
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

.controller( 'CommitteeCtrl', ['$location', '$sailsSocket', '$scope', 'committee', 'CommitteeMemberModel', 'config', 'memberCount', 'titleService', function CommitteeCtrl( $location, $sailsSocket, $scope, committee, CommitteeMemberModel, config, memberCount, titleService) {
    $scope.committee = committee;
    $scope.currentUser = config.currentUser;
    titleService.setTitle(committee.title + ' - voetr');
    if (committee == undefined){$location.url('committees')};
    $scope.editCommitteeToggle = false;
    $scope.billCount = 0;
    $scope.memberCount = memberCount.committeeMemberCount;
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

    $sailsSocket.subscribe('committeemember', function (envelope) {
        console.log(envelope)
        switch(envelope.verb) {
            case 'created':
                if (envelope.data.committee == $scope.committee.id){
                    CommitteeMemberModel.getCommitteeMemberCount('committee', committee.id).then(function(memberCount){
                        $scope.memberCount = memberCount.committeeMemberCount;
                    });
                }
                break;
        }
    });

}])

.controller( 'CommitteeActivityCtrl', ['$location', '$scope', '$sailsSocket', '$stateParams', 'config', 'lodash', 'BillModel', 'bills', 'committee', 'CommitteeModel', 'PostModel', 'posts', 'titleService', 'VoteVoteModel', function CommitteeHomeCtrl( $location, $scope, $sailsSocket, $stateParams, config, lodash, BillModel, bills, committee, CommitteeModel, PostModel, posts, titleService, VoteVoteModel) {
    $scope.committee = committee;
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.posts = posts;
    $scope.newBill = {};
    $scope.newPost = {};
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

.controller( 'CommitteeCommitteesCtrl', ['$sailsSocket', '$scope', 'committee', 'committees', 'config', function CommitteeBillCtrl($sailsSocket, $scope, committee, committees, config) {
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.committees = committees;

}])

.controller( 'CommitteeDiscussionCtrl', ['$sailsSocket', '$scope', 'committee', 'config', 'PostModel', 'posts', function CommitteeDiscussionCtrl( $sailsSocket, $scope, committee, config, PostModel, posts) {
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.newPost = {};
    $scope.posts = posts;

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

}])

.controller( 'CommitteeMemberCtrl', ['$sailsSocket', '$scope', 'committee', 'CommitteeMemberModel', 'config', 'memberCount', 'members', 'titleService', function CommitteeMemberCtrl( $sailsSocket, $scope, committee, CommitteeMemberModel, config, memberCount, members, titleService) {
    titleService.setTitle(committee.title + ' Members - voetr');
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









