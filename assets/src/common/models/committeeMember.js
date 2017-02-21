angular.module('models.committeeMember', ['lodash', 'services', 'sails.io',])

.service('CommitteeMemberModel', function(lodash, utils, $sailsSocket) {

    this.getSome = function(limit, skip, sort) {
        //this could be master function, pass json filter obj eg. {member: member.id, committee: committee.id}
        var url = utils.prepareUrl('committeemember/filter/' + limit + '/' + skip + '/' + sort);
        return $sailsSocket.get(url).then(success, error);
    };

    this.getByCommittee = function(limit, skip, model) {
        var url = utils.prepareUrl('committeemember/committee/' + model);
        var params = {limit: limit, skip: skip}
        return $sailsSocket.get(url, params).then(success, error);
    };

    this.getByMember = function(model) {
        var url = utils.prepareUrl('committeemember/member/' + model);
        return $sailsSocket.get(url).then(success, error);
    }

    this.create = function(newModel) {
        var url = utils.prepareUrl('committeemember');
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
});