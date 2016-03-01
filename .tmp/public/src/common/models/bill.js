angular.module('models.bill', ['lodash', 'services', 'sails.io',])

.service('BillModel', function(lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('bill');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getOne = function(model) {
        var url = utils.prepareUrl('bill/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip, sort, filter) {
        var url = utils.prepareUrl('bill/filter/' + limit + '/' + skip);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUrl = function(model) {
        var url = utils.prepareUrl('bill/url/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByCommittee = function(model) {
        var url = utils.prepareUrl('bill/committee/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('bill');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('bill/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
});