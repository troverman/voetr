angular.module( 'voetr.nav', [
])

.controller( 'NavCtrl', function NavController( $scope, $state, config, $rootScope ) {
    $scope.currentUser = config.currentUser;
    $rootScope.$on("$stateChangeSuccess", function() {
    	console.log('ok')
        window.scrollTo(0, 0);
    });
});