angular.module('models.follower', ['lodash', 'services', 'sails.io',])

.service('FollowerModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getByUser = function(model) {
        var url = utils.prepareUrl('follower/followers/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('follower');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('follower/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);