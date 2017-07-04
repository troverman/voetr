angular.module('models.committeeBill', ['lodash', 'services', 'sails.io',])

.service('CommitteeBillModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getSome = function(filter, model, limit, skip, sort) {
        var url = utils.prepareUrl('committeebill');
        var query = {params:{filter: filter, id: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getCommitteeMemberCount = function(filter, model) {
        var url = utils.prepareUrl('committeebill/count');
        var query = {params:{filter: filter, id: model }};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('committeebill');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.update = function(newModel) {
        var url = utils.prepareUrl('committeebill');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('committeebill/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };

}]);