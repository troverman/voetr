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

.controller( 'AccountCtrl', function AccountController( $location, $rootScope, $scope, config, titleService, user, UserModel, Upload ) {
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
        if (file){
            $scope.avatarLoading = true;
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $scope.avatarLoading = false;
                $rootScope.stateIsLoading = false;
    			$scope.user.avatarUrl = response.data.amazonUrl;
                $scope.accountSave();
            },
            function(err){
                $scope.avatarLoading = false;
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.avatarPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.uploadCover = function(file){
        if (file){
            $scope.coverLoading = true;
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $scope.coverLoading = false;
                $rootScope.stateIsLoading = false;
    			$scope.user.coverUrl = response.data.amazonUrl;
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
            },
            function(err){
                $scope.coverLoading = false;
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.coverPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.uploadIdentification = function(file){
        if (file){
            $scope.identificationLoading = true;
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $scope.identificationLoading = false;
                $rootScope.stateIsLoading = false;
                $scope.user.identificationUrl = response.data.amazonUrl;
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
            },
            function(err){
                $scope.identificationLoading = false;
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.identificationPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.removePassport = function(provider) {
        UserModel.removePassport(provider)
        .then(function(result) {
            $scope.user.passports = $scope.user.passports.filter(function(val, ind, arr) {
                return !(arr[ind].identifier === result[0].identifier);
            });
            $scope.facebookPassport = $scope.user.passports.filter(function(e){return e.provider == 'facebook'}).length>0;
            $scope.twitterPassport = $scope.user.passports.filter(function(e){return e.provider == 'twitter'}).length>0;
            $scope.googlePassport = $scope.user.passports.filter(function(e){return e.provider == 'google'}).length>0;
            $scope.user.socialAccounts[(result[0].provider).toString()] = {}
            //UserModel.update(user)
        });
    }

    $scope.hasSinglePassport = function() {
        return $scope.user.passports.length <= 1;
    }

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
