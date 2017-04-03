angular.module( 'voetr.search', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'search', {
        abstract: true,
        url: '/search',
        views: {
            "main": {
                templateUrl: 'search/index.tpl.html'
            }
        }
    })
    .state( 'search.index', {
        url: '',
        views: {
            "search": {
                controller: 'SearchController',
                templateUrl: 'search/index.tpl.html'
            }
        },
        resolve: {
            searchResults: ['SearchModel', function(SearchModel) {
                return SearchModel.search('');
            }],
            bills: ['BillModel', function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            }],
            committees: ['CommitteeModel', function(CommitteeModel){
                return CommitteeModel.getSome(10, 0, 'createdAt DESC');
            }],
            users: ['userCount', 'UserModel', function(userCount, UserModel){
                var rand = Math.floor(Math.random() * (userCount.userCount + 1));
                return UserModel.getSome(33, rand);
            }],
            userCount: ['UserModel', function(UserModel){
                return UserModel.getCount();
            }],
            votes: ['VoteModel', function(VoteModel){
                return VoteModel.getSome(10, 0, 'createdAt DESC');
            }],
        }
    })
    .state( 'search.query', {
        url: '/:searchQuery',
        views: {
            "search": {
                controller: 'SearchController',
                templateUrl: 'search/index.tpl.html'
            }
        },
        resolve: {
            //restructure to commitee search, bill search, memeber search etccccc
            searchResults: ['$stateParams', 'SearchModel', function($stateParams, SearchModel) {
                return SearchModel.search($stateParams.searchQuery);
            }],
            bills: ['BillModel', function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            }],
            committees: ['CommitteeModel', function(CommitteeModel){
                return CommitteeModel.getSome(10, 0, 'createdAt DESC');
            }],
            users: ['userCount', 'UserModel', function(userCount, UserModel){
                var rand = Math.floor(Math.random() * (userCount.userCount + 1));
                return UserModel.getSome(33, rand);
            }],
            userCount: ['UserModel', function(UserModel){
                return UserModel.getCount();
            }],
            votes: ['VoteModel', function(VoteModel){
                return VoteModel.getSome(10, 0, 'createdAt DESC');
            }],
         }
    });
}])

.controller( 'SearchController', ['$rootScope', '$scope', '$stateParams', 'bills', 'committees', 'config', 'lodash', 'RepresentativeModel', 'searchResults', 'SearchModel', 'titleService', 'userCount', 'users', 'votes', function SearchController( $rootScope, $scope, $stateParams, bills, committees, config, lodash, RepresentativeModel, searchResults, SearchModel, titleService, userCount, users, votes ) {
    $scope.searchQuery = $stateParams.searchQuery;
    if (typeof $scope.searchQuery != "undefined" && $scope.searchQuery != ''){titleService.setTitle($scope.searchQuery + ' - voetr');}
    else{titleService.setTitle('search - voetr');}
    $scope.bills = bills;
    $scope.committees = committees;
    $scope.searchResults = searchResults;
    $scope.gettingRepresentatives = false;
    $scope.officialRepresentatives = {};
    $scope.userCount = userCount.userCount;
    $scope.users = users;
    $scope.votes = votes;


    $scope.keyPress = function(searchValue){
        $rootScope.stateIsLoading = true;
        SearchModel.search(searchValue).then(function(models){
            $rootScope.stateIsLoading = false;
            $scope.searchResults = models;
        });
    };

    $scope.getLatLng = function() {
        if (navigator.geolocation) {
            $scope.gettingRepresentatives = true;
            $rootScope.stateIsLoading = true;
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude; 
                lng = position.coords.longitude;
                RepresentativeModel.getByLocation(lat, lng).then(function(representatives){
                    $scope.officialRepresentatives = representatives;
                    $scope.gettingRepresentatives = false;
                    $rootScope.stateIsLoading = false;
                });
            });
        }
    };

}]);