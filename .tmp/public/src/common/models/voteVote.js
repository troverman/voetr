angular.module('models.voteVote', ['lodash', 'services', 'sails.io',])

.service('VoteVoteModel', function(lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('vote');
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByBill = function(model) {
        var url = utils.prepareUrl('vote/bill/' + model);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByVote = function(model) {
        var url = utils.prepareUrl('votevote/vote/' + model);
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
});