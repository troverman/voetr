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
            },
            bills_api: function($http){
                var url = 'http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70'
                return $http.get(url).
                    success(function(data, status, headers, config) {
                      return data;
                    }).
                    error(function(data, status, headers, config) {
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
            bills: function(BillModel) {
                return BillModel.getAll();
            }
         }
    });

})

.controller( 'CommitteeCtrl', function CommitteeController( $scope, $sailsSocket, $location, lodash, titleService, config, $stateParams, BillModel, bills, CommitteeModel, committee, bills_api) {

    $scope.committee = committee;
    if (committee == undefined){
        $location.url('committees');
    };

    titleService.setTitle(committee.title + ' - voetr');
    $scope.currentUser = config.currentUser;

    $scope.bills = bills;
    $scope.bills1 = bills_api.data.results;
    console.log($scope.bills1);

    $scope.newBill = {};

    $sailsSocket.subscribe('bill', function (envelope) {
    	console.log('ok');
	    switch(envelope.verb) {
	        case 'created':
	            $scope.bills.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.bills, {id: envelope.id});
	            break;
	    }
    });

    $scope.createBill = function(newBill) {
        newBill.user = config.currentUser.id;
        BillModel.create(newBill).then(function(model) {
            $scope.newBill = {};
        });
    };


	$scope.changeVote = function(vote, flag){
		$scope.vote = vote==flag?'None':flag;
	};

    $scope.upVote = function () {
        $scope.vote++;
    }

    $scope.downVote = function () {
        $scope.vote--;
    }

    $scope.vote = 0;


});









