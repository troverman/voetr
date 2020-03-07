module.exports = {
	attributes: {
        committee: {model: 'committee', required: true},
        bill: {model: 'bill', required: true}
    },
    afterCreate: async function(model, next){
        var count = await CommitteeBill.count().where({committee: model.committee})
        var updated = await Committee.update({id: model.committee}, {billCount: committeeBillCount}).then(function(updated){
        console.log('Committee Bill Count Updated')
        Committee.publishUpdate(model.committee, updated[0]);
        return next();
    }
};