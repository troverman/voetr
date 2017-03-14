angular.module('models.bill', ['lodash', 'services', 'sails.io',])

.service('BillModel', function(lodash, utils, $sailsSocket) {

    this.getOne = function(model) {
        var url = utils.prepareUrl('bill/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip, sort) {
        var url = utils.prepareUrl('bill');
        var query = {params:{limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getCount = function() {
        var url = utils.prepareUrl('bill/count');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUrl = function(model) {
        var url = utils.prepareUrl('bill/url/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByCommittee = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('bill/committee');
        var query = {params:{committee: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
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