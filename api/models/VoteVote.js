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
                    .then(function(model){
                        VoteVote.publishUpdate(model[0].id, model);
                    });
                }
            }
        });
    },

    //afterCreate --> update voteCount on bill model

    getOne: function(id) {
        return VoteVote.findOne(id)
        .populate('bill')
        .populate('user')
        .populate('vote')
        .then(function (model) {
            return [model];
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

    getByUser: function(user, limiting, skipping, sort) {
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

 