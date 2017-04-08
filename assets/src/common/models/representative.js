angular.module('models.representative', ['lodash', 'services', 'sails.io',])

.service('RepresentativeModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {

    this.getConstituents = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('representative/constituents/' + model);
        var query = {params:{user: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getConstituentCount = function(model) {
        var url = utils.prepareUrl('representative/user/constituent/count/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getRepresentatives = function(model, limit, skip, sort) {
        var url = utils.prepareUrl('representative/representatives/' + model);
        var query = {params:{user: model, limit:limit, skip:skip, sort: sort}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.getRepresentativeCount = function(model) {
        var url = utils.prepareUrl('representative/user/representative/count/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByLocation = function(lat, lng) {
        var url = utils.prepareUrl('representative/location');
        var query = {params:{lat:lat, lng:lng}};
        return $sailsSocket.get(url, query).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('representative');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('representative/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };

}]);