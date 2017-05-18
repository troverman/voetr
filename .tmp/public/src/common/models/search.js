angular.module('models.search', ['lodash', 'services', 'sails.io',])

.service('SearchModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.search = function(model) {
        var url = utils.prepareUrl('search/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getTrending = function() {
        var url = utils.prepareUrl('trending');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getMemberActivity = function(limit, skip, sort, filter) {
        var query = {params:{limit:limit, skip:skip, sort: sort, filter: filter}};
        var url = utils.prepareUrl('search/memberActivity');
        return $sailsSocket.get(url, query).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);