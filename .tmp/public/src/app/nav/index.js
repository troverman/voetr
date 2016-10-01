angular.module( 'voetr.nav', [
])

.controller( 'NavCtrl', function NavController( $scope, $state, config, $rootScope ) {
    $scope.currentUser = config.currentUser;
   	$rootScope.$on("$stateChangeSuccess", function() {
        window.scrollTo(0, 0);
    });
});