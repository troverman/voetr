module.exports = {
	attributes: {
        representative: {model: 'user', required: true},
        constituent: {model: 'user', required: true},
        committee: {model: 'committee'}
    },
    beforeCreate: function(model, next){
        var representative = await Representative.find({constituent: model.constituent, representative:model.representative})
        if (representative.length == 0){return next(null, representative);}
    },
    afterCreate: async function(model, next){
        var count = await Representative.count().where({constituent: model.constituent})
        var updated = await User.update({id: model.constituent}, {representativeCount:count});
        User.publishUpdate(model.user, updated[0]);
        var count = await Representative.count().where({representative: model.representative})
        var updated = await User.update({id: model.representative}, {constituentCount:count});
        User.publishUpdate(model.user, updated[0]);
        return next();
    }
};

