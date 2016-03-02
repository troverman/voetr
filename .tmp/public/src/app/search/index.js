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
            }
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
            searchResults: function(SearchModel, $stateParams) {
                return SearchModel.search($stateParams.searchQuery);
            }
         }
    });
})

.controller( 'SearchController', function SearchController( $scope, $stateParams, lodash, config, titleService, searchResults, SearchModel ) {
    titleService.setTitle('Search');
    $scope.searchQuery = $stateParams.searchQuery;
    $scope.searchResults = searchResults;

    $scope.keyPress = function(searchValue){
        SearchModel.search(searchValue).then(function(models){
            $scope.searchResults = models;
        });
    }

});