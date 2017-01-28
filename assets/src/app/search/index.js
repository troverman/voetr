angular.module( 'voetr.search', [
])

.config(function config( $stateProvider ) {
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
            searchResults: function(SearchModel) {
                return SearchModel.search('');
            },
            bills: function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            },
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
            searchResults: function(SearchModel, $stateParams) {
                return SearchModel.search($stateParams.searchQuery);
            },
            bills: function(BillModel){
                return BillModel.getSome(10, 0, 'createdAt DESC');
            },
         }
    });
})

.controller( 'SearchController', function SearchController( $rootScope, $scope, $stateParams, lodash, config, titleService, searchResults, SearchModel, RepresentativeModel, bills ) {
    $scope.searchQuery = $stateParams.searchQuery;
    if (typeof $scope.searchQuery != "undefined" && $scope.searchQuery != ''){titleService.setTitle($scope.searchQuery + ' - voetr');}
    else{titleService.setTitle('search - voetr');}
    $scope.bills = bills;
    $scope.searchResults = searchResults;
    $scope.gettingRepresentatives = false;
    
    $scope.keyPress = function(searchValue){
        $rootScope.stateIsLoading = true;
        SearchModel.search(searchValue).then(function(models){
            $rootScope.stateIsLoading = false;
            $scope.searchResults = models;
        });
    };

    $scope.officialRepresentatives = {};

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

});