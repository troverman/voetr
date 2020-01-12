angular.module('models.committee', ['lodash', 'services', 'sails.io',])

.service('CommitteeModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getSome = function(limit, skip, sort) {
        var url = utils.prepareUrl('committee');
        var query = {params:{limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getMembersByCommittee = function(model) {
        var url = utils.prepareUrl('committeemember/committee/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getChildren = function(model) {
        var url = utils.prepareUrl('committee/children/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getParent = function(model) {
        var url = utils.prepareUrl('committee/parent/' + model);
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

    this.update = function(newModel) {
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
    
}]);