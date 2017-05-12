angular.module('models.vote', ['lodash', 'services', 'sails.io',])

.service('VoteModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getActivity = function(limit, skip, sort, model) {
        var url = utils.prepareUrl('vote/activity');
        var query = {params:{limit:limit, skip:skip, sort: sort, filter:{vote: model}}};
        return $sailsSocket.get(url, query).then(success, error);
    };
    
    this.getOne = function(model) {
        var url = utils.prepareUrl('vote/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getSome = function(limit, skip, sort) {
        var url = utils.prepareUrl('vote');
        var query = {params:{limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByBill = function(model) {
        var url = utils.prepareUrl('vote/bill/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByUser = function(model) {
        var url = utils.prepareUrl('vote/user/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('vote');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('vote/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };

}]);