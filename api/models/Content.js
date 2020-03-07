module.exports = {
	attributes: {
        post: {type: 'string', required: true},
        title: {type: 'string'},
        bill: {model: 'bill'},
        committee: {model: 'committee'},
        postModel: {model: 'post'},
        profile: {model: 'user'},
        vote: {model: 'vote'},
        user: {model: 'user', required: true},
        plusCount: {type: 'integer', defaultsTo: 0},
        minusCount: {type: 'integer', defaultsTo: 0},
    }
};

 