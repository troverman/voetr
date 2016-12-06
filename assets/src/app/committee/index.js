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
            bills: function(BillModel) {
                return BillModel.getByCommittee(1, 100, 0, 'voteCount DESC');
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
            bills: function(BillModel) {
                return BillModel.getByCommittee(1, 100, 0, 'createdAt DESC');
            }
         }
    })
    .state( 'committee.committees', {
        url: '/committees',
        views: {
            "committees": {
                controller: 'CommitteeCommitteesCtrl',
                templateUrl: 'committee/committees.tpl.html'
            }
        },
        resolve: {
            committees: function() {
                return [1,2,3,4,5,6,7,8];
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
            members: function(BillModel) {
                return [{username:'troverman', avatarUrl:'/images/trevor.jpg'}];
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

.controller( 'CommitteeHomeCtrl', function CommitteeHomeCtrl( $scope, $sailsSocket, $location, lodash, titleService, config, $stateParams, BillModel, bills, CommitteeModel, committee, VoteVoteModel) {
    $scope.committee = committee;
    if (committee == undefined){
        $location.url('committees');
    };
    titleService.setTitle(committee.title + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.newBill = {};
    $scope.newVote = {};
    $scope.createBillToggle = false;
    $scope.editCommitteeToggle = false;

    $scope.toggleCreateBill = function(){
        $scope.createBillToggle = $scope.createBillToggle ? false : true;
    }

    $scope.toggleEditCommittee = function(){
        $scope.editCommitteeToggle = $scope.editCommitteeToggle ? false : true;
    }

    $scope.createBill = function(newBill) {
        newBill.user = config.currentUser.id;
        BillModel.create(newBill).then(function(model) {
            $scope.newBill = {};
        });
    };

    $scope.createVote = function(newVote, bill) {
        if ($scope.currentUser == undefined){
            return null;
        }
        $scope.newVote.bill = bill.id;
        $scope.newVote.user = config.currentUser.id;
        $scope.newVote.vote = newVote;
        VoteVoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    };

	$scope.changeVote = function(vote, flag){
		$scope.vote = vote==flag?'None':flag;
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
})

.controller( 'CommitteeCommitteesCtrl', function CommitteeBillCtrl( $scope, $sailsSocket, committee, committees) {
    $scope.committee = committee;
    $scope.committees = committees;
})

.controller( 'CommitteeDiscussionCtrl', function CommitteeDiscussionCtrl( $scope, $sailsSocket, committee, posts) {
    $scope.committee = committee;
    $scope.posts = posts;
})

.controller( 'CommitteeMemberCtrl', function CommitteeMemberCtrl( $scope, $sailsSocket, members, committee) {
    $scope.committee = committee;
    $scope.members = members;
})

.controller( 'CommitteeVoteCtrl', function CommitteeVoteCtrl( $scope, $sailsSocket, votes, committee) {
    $scope.committee = committee;
    $scope.votes = votes;
});









