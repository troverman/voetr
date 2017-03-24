angular.module( 'voetr.nav', [
])

.controller( 'NavCtrl',['$rootScope', '$scope', 'config', function NavController( $rootScope, $scope, config) {
    $scope.currentUser = config.currentUser;
   	$rootScope.$on("$stateChangeSuccess", function() {
        window.scrollTo(0, 0);
    });
}]);