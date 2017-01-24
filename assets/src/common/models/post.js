angular.module('models.post', ['lodash', 'services', 'sails.io',])

.service('PostModel', function(lodash, utils, $sailsSocket) {
    this.getOne = function(model) {
        var url = utils.prepareUrl('post/' + model.id);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getBySome = function(limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/' + limit + '/' + skip + '/' + sort);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByProfile = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/profile/' + model + '/' + limit + '/' + skip + '/' + sort);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUser = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/user/' + model + '/' + limit + '/' + skip + '/' + sort);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('post');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.update = function(newModel) {
        var url = utils.prepareUrl('post');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('post/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
});