module.exports = {
	attributes: {
        voteInteger: {type: 'integer', required: true},
        voteString: {type: 'string'},
        bill: {model: 'bill', required: true},
        user: {model: 'user', required: true}
    },
    beforeCreate: async function(model, next){
        var billVote = await BillVote.find({user: model.user, bill:model.bill, vote:model.vote})
        if (billVote.length == 0){return next(null, billVote);}
        else{
            if(billVote[0].voteInteger != model.voteInteger){  
                var model = await VoteVote.update({id: billVote[0].id}, model);
                BillVote.publishUpdate(model[0].id, model);
            }
        }
    }
};

 