module.exports = {
	attributes: {
        vote: {type: 'string', required: true},
        committee: {model: 'committee', required: true},
        user: {model: 'user', required: true}
    },
    getOne: function(id) {
        return CommitteeVote.findOne(id)
        .then(function (model) {return [model];});
    },
};

 