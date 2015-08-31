angular.module( 'voetr.member', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		url: '/member/:path',
		views: {
			"main": {
				controller: 'MemberCtrl',
				templateUrl: 'member/index.tpl.html'
			}
		}
	});
})

.controller( 'MemberCtrl', function MemberController( $scope, titleService, uiGmapGoogleMapApi ) {
	titleService.setTitle('Member');

});