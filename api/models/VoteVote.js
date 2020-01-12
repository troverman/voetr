module.exports = {
	attributes: {
        voteInteger: {type: 'integer', required: true},
        voteString: {type: 'string'},
        vote: {model: 'vote', required: true},
        bill: {model: 'bill', required: true},
        user: {model: 'user', required: true}
    },
    beforeCreate: async function(model, next){
        var voteVote = await VoteVote.find({user: model.user, bill:model.bill, vote:model.vote});
        if (voteVote.length == 0){return next(null, voteVote);}
        else{
            if(voteVote[0].voteInteger != model.voteInteger){  
                var updatedVoteVote = await VoteVote.update({id: voteVote[0].id}, model)
                var voteVoteCount = await VoteVote.count().where({vote:model.vote})
                var voteModel = await Vote.find({id: model.vote});
                if (model.voteInteger == 1){
                    voteModel[0].plusCount = voteModel[0].plusCount + 1;
                    voteModel[0].minusCount = voteModel[0].minusCount - 1;
                }
                if (model.voteInteger == -1){
                    voteModel[0].minusCount = voteModel[0].minusCount + 1;
                    voteModel[0].plusCount = voteModel[0].plusCount - 1;
                }
                voteModel[0].voteCount = voteVoteCount;
                var updated = await Vote.update({id: model.vote}, voteModel[0]);
                Vote.publishUpdate(model.vote, updated);   
                VoteVote.publishUpdate(model.id, model);
            }
        }
    },
    afterCreate: function(model, next){
        var voteVoteCount = await VoteVote.count().where({vote:model.vote})
        var voteModel = await Vote.find({id: model.vote});
        if (model.voteInteger == 1){voteModel[0].plusCount = voteModel[0].plusCount + 1;}
        if (model.voteInteger == -1){voteModel[0].minusCount = voteModel[0].minusCount + 1;}
        voteModel[0].voteCount = voteVoteCount;
        var updated = await Vote.update({id: model.vote}, voteModel[0]);
        Vote.publishUpdate(model.vote, updated);
        //LEAL
        var voteVoteCount = await VoteVote.count().where({bill:model.bill});
        var updated = await  Bill.update({id:model.bill, voteCount: voteVoteCount});
        Bill.publishUpdate(model.bill, updated[0]);
        var voteVoteCount = await  VoteVote.count().where({user:model.user})
        var updated = await User.update({id: model.user}, {voteCount:voteVoteCount});
        User.publishUpdate(model.user, updated);
        return next(null, model);
    },
}; 