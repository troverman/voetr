module.exports = {
	attributes: {
        title: {type: 'string',required: true},
        committee: {model: 'committee', required: true},
        user: {model: 'user', required: true}
    },
    beforeCreate: async function(model, next){
        var committeeMember = await CommitteeMember.find({committee: model.committee, user:model.user})
        if (committeeMember.length == 0){return next(null, committeeMember);}
    },
    afterCreate: async function(model, next){
        var count = await CommitteeMember.count().where({committee: model.committee})
        await Committee.update({id: model.committee}, {memberCount: committeeMemberCount});
        var count = await CommitteeMember.count().where({user: model.user})
        await User.update({id: model.user}, {committeeCount:count});
        return next();
    }
};