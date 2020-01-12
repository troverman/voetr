module.exports = {
	attributes: {
        title: {type: 'string', required: true},
        committee: {model: 'committee', required: true},
        user: {model: 'user', required: true}
    },
    getOne: function(id) {
        return CommitteElection.findOne(id)
        .then(function (model) {    return [model];});
    },
};