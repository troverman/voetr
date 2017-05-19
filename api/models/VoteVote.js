/**
* VoteVote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        voteInteger: {
            type: 'integer',
            required: true
        },
        voteString: {
            type: 'string',
        },
        vote: {
            model: 'vote',
            required: true
        },
        bill: {
            model: 'bill',
            required: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    beforeCreate: function(model, next){
        VoteVote.find({user: model.user, bill:model.bill, vote:model.vote})
        .then(function(voteVote){
            if (voteVote.length == 0){
                return next(null, voteVote);
            }
            else{
                if(voteVote[0].voteInteger != model.voteInteger){  
                    VoteVote.update({id: voteVote[0].id}, model)
                    .then(function(){
                        VoteVote.count()
                        .where({vote:model.vote})
                        .then(function(voteVoteCount){
                            Vote.find({id: model.vote}).then(function(voteModel){
                                if (model.voteInteger == 1){
                                    voteModel[0].plusCount = voteModel[0].plusCount + 1;
                                    voteModel[0].minusCount = voteModel[0].minusCount - 1;
                                }
                                if (model.voteInteger == -1){
                                    voteModel[0].minusCount = voteModel[0].minusCount + 1;
                                    voteModel[0].plusCount = voteModel[0].plusCount - 1;
                                }
                                voteModel[0].voteCount = voteVoteCount;
                                Vote.update({id: model.vote}, voteModel[0]).exec(function afterwards(err, updated){
                                    Vote.publishUpdate(model.vote, updated);
                                });
                            }); 
                        });
                        VoteVote.publishUpdate(model.id, model);
                    });
                }
            }
        });
    },

    afterCreate: function(model, next){
        VoteVote.count()
        .where({vote:model.vote})
        .then(function(voteVoteCount){
            Vote.find({id: model.vote}).then(function(voteModel){
                if (model.voteInteger == 1){voteModel[0].plusCount = voteModel[0].plusCount + 1;}
                if (model.voteInteger == -1){voteModel[0].minusCount = voteModel[0].minusCount + 1;}
                voteModel[0].voteCount = voteVoteCount;
                Vote.update({id: model.vote}, voteModel[0]).exec(function afterwards(err, updated){
                    Vote.publishUpdate(model.vote, updated);
                });
            }); 
        });
        VoteVote.count()
        .where({bill:model.bill})
        .then(function(voteVoteCount){
            Bill.update({id:model.bill, voteCount: voteVoteCount}).exec(function afterwards(err, updated){
                Bill.publishUpdate(model.bill, updated[0]);
            });
        });
        VoteVote.count()
        .where({user:model.user})
        .then(function(voteVoteCount){
            User.update({id: model.user}, {voteCount:voteVoteCount}).exec(function afterwards(err, updated){
                User.publishUpdate(model.user, updated);
            });
        });
        return next(null, model);
    },

    getOne: function(id) {
        return VoteVote.findOne(id)
        .populate('bill')
        .populate('user')
        .populate('vote')
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort, filter) {
        console.log(skipping)
        return VoteVote.find()
        .where(JSON.parse(JSON.stringify(filter)))
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('bill')
        .populate('user')
        .populate('vote')
        .then(function (models) {
            return models;
        });
    },

    getByBill: function(bill) {
        console.log(bill)
        return VoteVote.find()
        .where({bill: bill})
        .sort({createdAt: 'desc'})
        .populate('user')
        .then(function (models) {
            return models;
        });
    },

    getByUser: function(limiting, skipping, sort, user) {
        console.log(skipping)
        return VoteVote.find()
        .where({user: user})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('bill')
        .populate('user')
        .populate('vote')
        .then(function (models) {
            return models;
        });
    },

    getByVote: function(vote) {
        return VoteVote.find()
        .where({vote: vote})
        .sort({createdAt: 'desc'})
        .populate('user')
        .then(function (models) {
            return models;
        });
    },

};

 