angular.module( 'voetr.account', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AccountCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		},
		resolve: {
            user: ['UserModel', function(UserModel){
                return UserModel.getMine();
            }]
        }
	});
}])

.controller( 'AccountCtrl', ['$location', '$rootScope', '$scope', 'config', 'titleService', 'user', 'UserModel', 'Upload', function AccountController( $location, $rootScope, $scope, config, titleService, user, UserModel, Upload ) {
	titleService.setTitle('account | voetr');
	$scope.currentUser = config.currentUser;
    if (!$scope.currentUser){$location.path('/')};

	$scope.user = user;
    $scope.avatarPercentage = 0;
    $scope.coverPercentage = 0;

    $scope.localPassport = $scope.user.passports.filter(function(e){return e.protocol == 'local'});
    $scope.facebookPassport = $scope.user.passports.filter(function(e){return e.provider == 'facebook'}).length>0;
    $scope.twitterPassport = $scope.user.passports.filter(function(e){return e.provider == 'twitter'}).length>0;
    $scope.googlePassport = $scope.user.passports.filter(function(e){return e.provider == 'google'}).length>0;

    $scope.uploadAvatar = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
    			$scope.user.avatarUrl = response.data.amazonUrl;
                $scope.accountSave();
            },
            function(err){
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.avatarPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.uploadCover = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
    			$scope.user.coverUrl = response.data.amazonUrl;
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
            },
            function(err){
                $rootScope.stateIsLoading = false;
            },
            function (evt) {
                $scope.coverPercentage = parseInt(100.0 * evt.loaded / evt.total);
            })
        }
    };

    $scope.uploadIdentification = function(file){
        if (file){
            $rootScope.stateIsLoading = true;
            Upload.upload({
                url: '/api/user/upload',
                method: 'POST',
                data: {picture: file}
            })
            .then(function(response){
                $rootScope.stateIsLoading = false;
                $scope.user.identificationUrl = response.data.amazonUrl;
                $scope.accountSave();//probably should have a save button here -- if not save delete failed file
            },
            function(err){
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
        $rootScope.stateIsLoading = true;
        var model = {
            id: $scope.user.id,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            avatarUrl: $scope.user.avatarUrl,
			coverUrl: $scope.user.coverUrl,
            identificationUrl: $scope.user.identificationUrl,
            address: $scope.user.address,
        };
        UserModel.update(model).then(function(){
            $rootScope.stateIsLoading = false;
        });
    }

}]);