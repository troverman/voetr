angular.module( 'voetr.nav', [
])

.controller( 'NavCtrl',['$mdSidenav', '$rootScope', '$scope', 'config', function NavController( $mdSidenav, $rootScope, $scope, config) {
    $scope.currentUser = config.currentUser;
   	$rootScope.$on("$stateChangeSuccess", function() {
        window.scrollTo(0, 0);
    });

   	$rootScope.navToggle = function(item){
        $mdSidenav('nav').toggle();
    };

    $rootScope.loginToggle = function(item){
        $mdSidenav('login').toggle();
    };

}]);