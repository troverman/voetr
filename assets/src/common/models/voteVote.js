angular.module('models.voteVote', ['lodash', 'services', 'sails.io',])

.service('VoteVoteModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getByBill = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('votevote/bill');
        var query = {params:{bill: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByVote = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('votevote/vote');
        var query = {params:{vote: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByUser = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('votevote/user');
        var query = {params:{user: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getUserCount = function(model) {
        var url = utils.prepareUrl('votevote/user/count/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('votevote');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.update = function(newModel){
        var url = utils.prepareUrl('votevote/' + newModel.id);
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('votevote/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        console.log(response)
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);