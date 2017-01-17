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

    $scope.localPassport = $scope.user.passports.filter(function(e){return e.protocol == 'local'});
    $scope.facebookPassport = $scope.user.passports.filter(function(e){return e.provider == 'facebook'}).length>0;
    $scope.twitterPassport = $scope.user.passports.filter(function(e){return e.provider == 'twitter'}).length>0;
    $scope.googlePassport = $scope.user.passports.filter(function(e){return e.provider == 'google'}).length>0;

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
            $scope.accountSave();
        },
        function(err){
            $scope.avatarLoading = false;
        },
        function (evt) {
            $scope.avatarPercentage = parseInt(100.0 * evt.loaded / evt.total);
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
            $scope.accountSave();//probably should have a save button here -- if not save delete failed file
        },
        function(err){
            $scope.coverLoading = false;
        },
        function (evt) {
            $scope.coverPercentage = parseInt(100.0 * evt.loaded / evt.total);
        })
    };

    $scope.uploadIdentification = function(file){
        $scope.identificationLoading = true;
        Upload.upload({
            url: '/api/user/upload',
            method: 'POST',
            data: {picture: file}
        })
        .then(function(response){
            $scope.identificationLoading = false;
            $scope.user.identificationUrl = response.data.amazonUrl;
            $scope.accountSave();//probably should have a save button here -- if not save delete failed file
        },
        function(err){
            $scope.identificationLoading = false;
        },
        function (evt) {
            $scope.identificationPercentage = parseInt(100.0 * evt.loaded / evt.total);
        })
    };

    $scope.accountSave = function(){
        $scope.saving = true;
        var model = {
            id: $scope.user.id,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            avatarUrl: $scope.user.avatarUrl,
			coverUrl: $scope.user.coverUrl,
            identificationUrl: $scope.user.identificationUrl,
        };
        console.log(model)
        return UserModel.update(model);
    }

});
