angular.module( 'voetr.committee', [
])

.config(function config( $stateProvider ) {
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
            committee: function(CommitteeModel, $stateParams) {
                return CommitteeModel.getByUrl($stateParams.path);
            }
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
            bills: function(BillModel, committee) {
                return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
            },
            committees: function(CommitteeModel, committee) {
                return CommitteeModel.getChildren(committee.id);
            },
            members: function(CommitteeMemberModel, committee) {
                return CommitteeMemberModel.getByCommittee(100, 0, committee.id);
            },
            posts: function() {
                return [1,2,3,4,5,6,7,8];
            },
            votes: function(VoteModel) {
                return VoteModel.getSome(10, 0, 'voteCount DESC');
                //CommitteeBills --> populate attached votes
            }
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
            bills: function(BillModel, committee) {
                return BillModel.getByCommittee(committee.id, 100, 0, 'voteCount DESC');
            }
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
            committees: function(CommitteeModel, committee) {
                return CommitteeModel.getChildren(committee.id);
            }
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
            posts: function() {
                return [1,2,3,4,5,6,7,8];
            }
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
            members: function(CommitteeMemberModel, committee) {
                return CommitteeMemberModel.getByCommittee(100, 0, committee.id);
            }
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
            votes: function(VoteModel) {
                return VoteModel.getSome(100, 0, 'voteCount DESC');
            }
         }
    })

})

.controller( 'CommitteeCtrl', function CommitteeCtrl( $scope, committee) {
    $scope.committee = committee;
})

.controller( 'CommitteeHomeCtrl', function CommitteeHomeCtrl( $location, $scope, $sailsSocket, $location, lodash, titleService, config, $stateParams, BillModel, bills, members, CommitteeModel, committee, VoteVoteModel) {
    $scope.committee = committee;
    if (committee == undefined){$location.url('committees');};
    titleService.setTitle(committee.title + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.members = members;
    $scope.newBill = {};
    $scope.newVote = {};
    $scope.createBillToggle = false;
    $scope.editCommitteeToggle = false;

    console.log(committee)

    $scope.toggleCreateBill = function(){
        $scope.createBillToggle = $scope.createBillToggle ? false : true;
    }

    $scope.toggleEditCommittee = function(){
        $scope.editCommitteeToggle = $scope.editCommitteeToggle ? false : true;
    }

    $scope.goToPath = function(path){
        $location.path('committee/' + $scope.committee.urlTitle + '/' + path)
    }

    $scope.createBill = function(newBill) {
        newBill.user = config.currentUser.id;
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

})

.controller( 'CommitteeBillCtrl', function CommitteeBillCtrl( $scope, $sailsSocket, committee, bills) {
    $scope.committee = committee;
    $scope.bills = bills;
    console.log(bills)
})

.controller( 'CommitteeCommitteesCtrl', function CommitteeBillCtrl( $scope, $sailsSocket, committee, committees) {
    console.log('hello')
    $scope.committee = committee;
    $scope.committees = committees;
})

.controller( 'CommitteeDiscussionCtrl', function CommitteeDiscussionCtrl( $scope, $sailsSocket, committee, posts) {
    $scope.committee = committee;
    $scope.posts = posts;
})

.controller( 'CommitteeMemberCtrl', function CommitteeMemberCtrl( $sailsSocket, $scope, $sailsSocket, members, config, committee, CommitteeMemberModel, titleService) {
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

})

.controller( 'CommitteeVoteCtrl', function CommitteeVoteCtrl( $scope, $sailsSocket, votes, committee) {
    $scope.committee = committee;
    $scope.votes = votes;
});









