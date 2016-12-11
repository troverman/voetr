angular.module('models.user', ['lodash', 'services', 'sails.io',])

.service('UserModel', function($q, lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('user');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip) {
        var url = utils.prepareUrl('user/filter/' + limit + '/' + skip);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getMine = function() {
        var url = utils.prepareUrl('user/me');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getCount = function() {
        var url = utils.prepareUrl('user/count');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUsername = function(model) {
        var url = utils.prepareUrl('user/username/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getOne = function(id) {
        var deferred = $q.defer();
        var url = utils.prepareUrl('user/' + id);

        $sailsSocket.get(url, function(model) {
            return deferred.resolve(model);
        });

        return deferred.promise;
    };

    this.create = function(newModel) {
        var deferred = $q.defer();
        var url = utils.prepareUrl('user');

        $sailsSocket.post(url, newModel, function(model) {
            return deferred.resolve(model);
        });

        return deferred.promise;
    };

    this.update = function(newModel){
        var url = utils.prepareUrl('user/' + newModel.id);
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
});