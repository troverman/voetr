angular.module( 'voetr.account', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AccountCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		},
		resolve: {
            UserModel: 'UserModel',
            user: function(UserModel){
                return UserModel.getMine();
            }
        }
	});
})

.controller( 'AccountCtrl', function AccountController( $scope, config, titleService, user, UserModel, Upload ) {
	titleService.setTitle('account - voetr');
	$scope.currentUser = config.currentUser;
	$scope.user = user;
	$scope.avatarLoading = false;
    $scope.avatarPercentage = 0;
   	$scope.coverLoading = false;
    $scope.coverPercentage = 0;

    $scope.uploadAvatar = function(file){
        $scope.avatarLoading = true;
        Upload.upload({
            url: '/api/user/upload',
            method: 'POST',
            data: {picture: file}
        })
        .then(function(response){
            $scope.avatarLoading = false;
			$scope.user.avatarUrl = response.data.amazonUrl;
            accountSave();
        },
        function(err){
            $scope.avatarLoading = false;
        },
        function (evt) {
            $scope.avatarPercentage = parseInt(100.0 * evt.loaded / evt.total);;
        })
    };

    $scope.uploadCover = function(file){
        $scope.coverLoading = true;
        Upload.upload({
            url: '/api/user/upload',
            method: 'POST',
            data: {picture: file}
        })
        .then(function(response){
            $scope.coverLoading = false;
			$scope.user.coverUrl = response.data.amazonUrl;
            accountSave();
        },
        function(err){
            $scope.coverLoading = false;
        },
        function (evt) {
            $scope.coverPercentage = parseInt(100.0 * evt.loaded / evt.total);;
        })
    };

   function accountSave(){
        $scope.saving = true;

        var model = {
            id: $scope.user.id,
            avatarUrl: $scope.user.avatarUrl,
			coverUrl: $scope.user.coverUrl,

        };
        console.log(model)

        return UserModel.update(model);
    }

});
