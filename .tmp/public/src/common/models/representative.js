angular.module('models.representative', ['lodash', 'services', 'sails.io',])

.service('RepresentativeModel', function(lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('representative');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getConstituents = function(model) {
        var url = utils.prepareUrl('representative/constituents/' + model.id);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getRepresentatives = function(model) {
        var url = utils.prepareUrl('representative/representatives/' + model.id);
        return $sailsSocket.get(url).then(success, error);
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
});