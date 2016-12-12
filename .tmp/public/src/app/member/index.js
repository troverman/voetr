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
                return VoteVoteModel.getByUser(member.id, 25, 0, 'createdAt desc');
            },
            voteCount: function(VoteVoteModel, member) {
                return VoteVoteModel.getUserCount(member.id);
            }
        }
    });
})

.controller( 'MemberCtrl', function MemberController( $scope, config, member, titleService, voteCount, votes, VoteVoteModel ) {
	titleService.setTitle(member.username + ' - voetr');
    $scope.currentUser = config.currentUser;
	$scope.member = member;
	$scope.votes = votes;
    $scope.voteCount = voteCount.voteCount;
    $scope.following = votes;
    $scope.followers = votes;
    $scope.committees = votes;
    $scope.representing = votes;
    $scope.skip = 0;
    console.log(member);

    $scope.loadMore = function() {
        $scope.skip = $scope.skip + 25;
        VoteVoteModel.getByUser($scope.member.id, 25, $scope.skip).then(function(committees) {
            Array.prototype.push.apply($scope.committees, committees);
            console.log($scope.committees);
        });
    };

});