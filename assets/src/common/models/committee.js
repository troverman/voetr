angular.module('models.committee', ['lodash', 'services', 'sails.io',])

.service('CommitteeModel', function(lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('committee');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip, sort) {
        var url = utils.prepareUrl('committee/filter/' + limit + '/' + skip + '/' + sort);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getCount = function() {
        var url = utils.prepareUrl('committee/count');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUrl = function(model) {
        var url = utils.prepareUrl('committee/url/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('committee');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('committee/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
});