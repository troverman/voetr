angular.module('models.comment', ['lodash', 'services', 'sails.io',])

.service('CommentModel', ['$sailsSocket', 'utils', function($sailsSocket, utils) {
    
    this.getByBill = function(model) {
        var url = utils.prepareUrl('comment/bill/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.create = function(newModel) {
        var url = utils.prepareUrl('comment');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.update = function(newModel) {
        var url = utils.prepareUrl('comment');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function(model) {
        var url = utils.prepareUrl('comment/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
    
}]);