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
            }]
        }
	})
    .state( 'committee.home', {
        url: '',
        views: {
            "home": {
                controller: 'CommitteeHomeCtrl',
                templateUrl: 'committee/home.tpl.html'
            }
        },
        resolve: {
            bills: ['BillModel', 'committee', function(BillModel, committee) {
                return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
            }],
            committees: ['committee', 'CommitteeModel', function(committee, CommitteeModel) {
                return CommitteeModel.getChildren(committee.id);
            }],
            members: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel) {
                return CommitteeMemberModel.getByCommittee(committee.id, 100, 0);
            }],
            posts: ['committee', 'PostModel', function(committee, PostModel) {
                return PostModel.getByCommittee(committee.id, 100, 0, 'createdAt desc');
            }],
            votes: ['VoteModel', function(VoteModel) {
                return VoteModel.getSome(10, 0, 'voteCount DESC');
                //CommitteeBills --> populate attached votes
            }]
         }
    })
    .state( 'committee.bills', {
        url: '/bills',
        views: {
            "bills": {
                controller: 'CommitteeBillCtrl',
                templateUrl: 'committee/bills.tpl.html'
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
                templateUrl: 'committee/committees.tpl.html'
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
            "discussion": {
                controller: 'CommitteeDiscussionCtrl',
                templateUrl: 'committee/discussion.tpl.html'
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
            "members": {
                controller: 'CommitteeMemberCtrl',
                templateUrl: 'committee/members.tpl.html'
            }
        },
        resolve: {
            members: ['committee', 'CommitteeMemberModel', function(committee, CommitteeMemberModel) {
                return CommitteeMemberModel.getByCommittee(committee.id, 100, 0);
            }]
         }
    })
    .state( 'committee.votes', {
        url: '/votes',
        views: {
            "votes": {
                controller: 'CommitteeVoteCtrl',
                templateUrl: 'committee/votes.tpl.html'
            }
        },
        resolve: {
            votes: ['VoteModel', function(VoteModel) {
                return VoteModel.getSome(100, 0, 'voteCount DESC');
            }]
         }
    })

}])

.controller( 'CommitteeCtrl', ['$scope', 'committee', function CommitteeCtrl( $scope, committee) {
    $scope.committee = committee;
}])

.controller( 'CommitteeHomeCtrl', ['$location', '$scope', '$sailsSocket', '$stateParams', 'config', 'lodash', 'BillModel', 'bills', 'members', 'committee', 'CommitteeModel', 'PostModel', 'posts', 'titleService', 'VoteVoteModel', function CommitteeHomeCtrl( $location, $scope, $sailsSocket, $stateParams, config, lodash, BillModel, bills, members, committee, CommitteeModel, PostModel, posts, titleService, VoteVoteModel) {
    $scope.committee = committee;
    if (committee == undefined){$location.url('committees');};
    titleService.setTitle(committee.title + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.posts = posts;
    $scope.members = members;
    $scope.newBill = {};
    $scope.newPost = {};
    $scope.newVote = {};
    $scope.createBillToggle = false;
    $scope.editCommitteeToggle = false;

    $scope.toggleCreateBill = function(){
        $scope.createBillToggle = $scope.createBillToggle ? false : true;
    };

    $scope.toggleEditCommittee = function(){
        $scope.editCommitteeToggle = $scope.editCommitteeToggle ? false : true;
    };

    $scope.goToPath = function(path){
        $location.path('committee/' + $scope.committee.urlTitle + '/' + path)
    };

    $scope.createPost = function(){
        $scope.newPost.user = $scope.currentUser.id;
        $scope.newPost.committee = $scope.committee.id
        PostModel.create($scope.newPost).then(function(model){
            console.log(model);
        })
    };

    $scope.createBill = function(newBill) {
        newBill.user = config.currentUser.id;
        newBill.committee = $scope.committee.id;
        BillModel.create(newBill).then(function(model) {
            $scope.newBill = {};
        });
    };

    $scope.createVote = function(newVote, bill) {
        if ($scope.currentUser == undefined){$location.path('/register');}
        $scope.newVote.bill = bill.id;
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.vote = newVote;
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
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

.controller( 'CommitteeBillCtrl', ['$sailsSocket', '$scope', 'committee', 'bills', function CommitteeBillCtrl($sailsSocket, $scope, committee, bills) {
    $scope.committee = committee;
    $scope.bills = bills;
    console.log(bills)
}])

.controller( 'CommitteeCommitteesCtrl', ['$sailsSocket', '$scope', 'committee', 'committees', function CommitteeBillCtrl($sailsSocket, $scope, committee, committees) {
    console.log('hello')
    $scope.committee = committee;
    $scope.committees = committees;
}])

.controller( 'CommitteeDiscussionCtrl', ['$sailsSocket', '$scope', 'committee', 'posts', function CommitteeDiscussionCtrl( $sailsSocket, $scope, committee, posts) {
    $scope.committee = committee;
    $scope.posts = posts;
}])

.controller( 'CommitteeMemberCtrl', ['$sailsSocket', '$scope', 'committee', 'CommitteeMemberModel', 'config', 'members', 'titleService', function CommitteeMemberCtrl( $sailsSocket, $scope, committee, CommitteeMemberModel, config, members, titleService) {
    titleService.setTitle(committee.title + ' Members - voetr');
    $scope.currentUser = config.currentUser;
    $scope.committee = committee;
    $scope.members = members;
    $scope.newMember = {}
    $scope.createMember = function(){
        $scope.newMember.user = $scope.currentUser.id;
        $scope.newMember.committee = $scope.committee.id;
        $scope.newMember.title = 'Committee Member';
        CommitteeMemberModel.create($scope.newMember);
    };

    $sailsSocket.subscribe('committeemember', function (envelope) {
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

.controller( 'CommitteeVoteCtrl', ['$scope', '$sailsSocket', 'committee', 'votes', function CommitteeVoteCtrl( $scope, $sailsSocket, committee, votes) {
    $scope.committee = committee;
    $scope.votes = votes;
}]);









