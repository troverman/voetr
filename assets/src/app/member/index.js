angular.module( 'voetr.member', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		abstract: true,
		url: '/member/:path',
		views: {
			"main": {
				templateUrl: 'member/index.tpl.html'
			}
		},
		resolve: {
            member: function(UserModel, $stateParams) {
                return UserModel.getByUsername($stateParams.path);
            }
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
            votes: function(VoteModel, member) {
                return VoteModel.getByUser(member.id);
            }
        }
    });
})

.controller( 'MemberCtrl', function MemberController( $scope, titleService, member, votes ) {
	titleService.setTitle(member.username + ' - voetr');
	$scope.member = member;
	$scope.votes = votes;
    $scope.following = votes;
    $scope.followers = votes;

});