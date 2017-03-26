angular.module( 'voetr.footer', [
])

.controller( 'FooterCtrl', ['$scope', function FooterCtrl( $scope ) {
   	$scope.date = new Date();
}])