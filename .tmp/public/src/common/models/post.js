angular.module('models.post', ['lodash', 'services', 'sails.io',])

.service('PostModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    
    this.getOne = function(model) {
        var url = utils.prepareUrl('post/' + model.id);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip, sort) {
        var url = utils.prepareUrl('post');
        var query = {params:{limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByBill = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/bill');
        var query = {params:{bill:model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByCommittee = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/committee');
        var query = {params:{committee:model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByProfile = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/profile');
        var query = {params:{profile:model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByUser = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/user');
        var query = {params:{user:model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByVote = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('post/filter/vote');
        var query = {params:{vote:model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
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

}]);