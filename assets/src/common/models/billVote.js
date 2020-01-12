angular.module('models.billVote', ['lodash', 'services', 'sails.io',])

.service('BillVoteModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getByBill = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('billvote/bill');
        var query = {params:{bill: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByUser = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('billvote/user');
        var query = {params:{user: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('billvote');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.update = function(newModel){
        var url = utils.prepareUrl('billvote/' + newModel.id);
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('billvote/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);