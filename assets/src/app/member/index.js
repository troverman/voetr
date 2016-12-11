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
            votes: function(VoteVoteModel, member) {
                return VoteVoteModel.getByUser(member.id);
            }
        }
    });
})

.controller( 'MemberCtrl', function MemberController( $scope, config, member, titleService, votes ) {
	titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
	$scope.member = member;
	$scope.votes = votes;
    $scope.following = votes;
    $scope.followers = votes;
    $scope.committees = votes;
    $scope.representing = votes;
    console.log(member)
});