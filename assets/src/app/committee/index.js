angular.module( 'voetr.committee', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'committee', {
        abstract: true,
		url: '/committee/:path',
		views: {
			"main": {
				templateUrl: 'committee/index.tpl.html'
			}
		},
		resolve: {
            committee: function(CommitteeModel, $stateParams) {
                return CommitteeModel.getByUrl($stateParams.path).then(function(models) {
                    return models;
                });
            }
        }
	})
    .state( 'committee.index', {
        url: '',
        views: {
            "committee": {
                controller: 'CommitteeCtrl',
                templateUrl: 'committee/index.tpl.html'
            }
        },
        resolve: {
            bills: function(BillModel, VoteModel) {
                //var votes = VoteModel.getAll();
                return BillModel.getAll();
                //return BillModel.getByCommittee();
                /*BillModel.getAll().then(function(bills){
                    VoteModel.getByBill().then(function(votes){
                        bill.votes = votes
                    });
                });*/
            }
         }
    });

})

.controller( 'CommitteeCtrl', function CommitteeController( $scope, $sailsSocket, $location, lodash, titleService, config, $stateParams, BillModel, bills, CommitteeModel, committee, VoteModel) {
    $scope.committee = committee;
    if (committee == undefined){
        $location.url('committees');
    };
    titleService.setTitle(committee.title + ' - voetr');
    $scope.currentUser = config.currentUser;
    $scope.bills = bills;
    $scope.newBill = {};
    $scope.newVote = {};

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
        VoteModel.create($scope.newVote).then(function(model) {
            $scope.newVote = {};
        });
    };

	$scope.changeVote = function(vote, flag){
		$scope.vote = vote==flag?'None':flag;
	};

    $scope.calculateVoteSum = function() {
        for (i in $scope.bills){
            $scope.bills[i].voteSum = 0
            for (j in $scope.bills[i].votes) { 
                $scope.bills[i].voteSum += $scope.bills[i].votes[j].vote
            }
        }
    }
    //$scope.calculateVoteSum();

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
                BillModel.getAll().then(function(bills){
                    $scope.bills = bills;
                    //lol lagg
                    //$scope.calculateVoteSum();
                });
                console.log($scope.bills);
                break;
        }
    });

});









