angular.module( 'voetr.footer', [
])

.controller( 'FooterCtrl', function FooterCtrl( $scope ) {
   	$scope.date = new Date();
})