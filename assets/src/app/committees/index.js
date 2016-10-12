angular.module( 'voetr.committees', [
])

.config(function config( $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider ) {
	$stateProvider.state( 'committees', {
		url: '/committees',
		views: {
			"main": {
				controller: 'CommitteesCtrl',
				templateUrl: 'committees/index.tpl.html'
			}
		},
		resolve: {
            committees: function(CommitteeModel) {
				return CommitteeModel.getSome(100,0);
            }
        }
	});
	uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDKPi-Krk_GCd_YfHS4ghUH3P4afPtPstA',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
	$urlRouterProvider.when('/committees/', '/committees');
})

.controller( 'CommitteesCtrl', function CommitteesController( $scope, $sailsSocket, lodash, titleService, config, CommitteeModel, committees) {
	titleService.setTitle('committees - voetr');
    $scope.committees = committees;
    $scope.currentUser = config.currentUser;
    $scope.skip = 0;
    $scope.map = {
		center: {latitude: 39.443659, longitude: -83.082276 },
		zoom: 8
	};
	$scope.options = {scrollwheel: false};
	$scope.windowOptions = {visible: false};

    $scope.loadMore = function() {
		$scope.skip = $scope.skip + 100;
		console.log($scope.skip);
		CommitteeModel.getSome(100,$scope.skip).then(function(committees) {
			Array.prototype.push.apply($scope.committees, committees);
			console.log($scope.committees);
		});
	};

	$scope.createCommittee = function(newCommittee) {
        //newCommittee.user = config.currentUser.id;
        CommitteeModel.create(newCommittee).then(function(model) {
            $scope.newCommittee = {};
        });
    };

    $sailsSocket.subscribe('committee', function (envelope) {
	    switch(envelope.verb) {
	        case 'created':
	            $scope.committees.unshift(envelope.data);
	            break;
	        case 'destroyed':
	            lodash.remove($scope.committees, {id: envelope.id});
	            break;
	    }
    });

});









