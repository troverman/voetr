module.exports = {
	attributes: {
        voteInteger: {type: 'integer', required: true},
        voteString: {type: 'string',},
        bill: {model: 'bill', required: true},
        user: {model: 'user', required: true}
    },
    beforeCreate: function(model, next){
        BillVote.find({user: model.user, bill:model.bill, vote:model.vote})
        .then(function(billVote){
            if (billVote.length == 0){return next(null, billVote);}
            else{
                if(billVote[0].voteInteger != model.voteInteger){  
                    VoteVote.update({id: billVote[0].id}, model)
                    .then(function(model){
                        BillVote.publishUpdate(model[0].id, model);
                    });
                }
            }
        });
    },
    getSome: function(limiting, skipping, sort) {
        return BillVote.find().sort(sort).limit(limiting).skip(skipping).populate('bill')
        .then(function (models) {return models;});
    },
    getByBill: function(bill) {
        return BillVote.find().where({bill: bill}).sort({createdAt: 'desc'}).populate('user').populate('bill')
        .then(function (models) {return models;});
    },
    getByUser: function(user) {
        return BillVote.find()
        .where({user: user})
        .sort({createdAt: 'desc'})
        .populate('bill')
        .then(function (models) {return models;});
    },
};

 