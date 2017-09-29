angular.module('models.committeeBill', ['lodash', 'services', 'sails.io',])

.service('CommitteeBillModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getSome = function(limit, skip, sort, filter) {
        var url = utils.prepareUrl('committeebill');
        var query = {params:{filter: filter, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getByCommiteeAndChildren = function(limit, skip, sort, committee) {
        var url = utils.prepareUrl('committeebill/children');
        var query = {params:{committee: committee, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('committeebill/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        console.log(response);
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };

}]);