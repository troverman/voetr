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
                console.log('new')
                return next(null, voteVote);
            }
            else{
                if(voteVote[0].voteInteger != model.voteInteger){  
                    VoteVote.update({id: voteVote[0].id}, model)
                    .then(function(model){
                        console.log('updated')
                        VoteVote.publishUpdate(model[0].id, model);
                    });
                }
            }
        });
    },

    afterCreate: function(model, next){
        VoteVote.count()
        .where({user: model.user, bill:model.bill, vote:model.vote})
        .then(function(voteCount){
            Vote.find({id: model.vote}).then(function(voteModel){
                if (req.param('voteInteger') == 1){voteModel[0].plusCount = voteModel[0].plusCount + 1;}
                if (req.param('voteInteger') == -1){voteModel[0].minusCount = voteModel[0].minusCount + 1;}
                voteModel[0].voteCount = voteVoteCount;
                Vote.update({id: model.vote}, voteModel[0]).exec(function afterwards(err, updated){
                    Vote.publishUpdate(model.vote, updated);
                });
            });
            Bill.update({id:model.bill, voteCount: voteCount}).exec(function afterwards(err, updated){
                Bill.publishUpdate(model.bill, updated[0]);
            });
            User.update({id: model.user}, {voteCount:voteVoteCount}).exec(function afterwards(err, updated){
                User.publishUpdate(req.param('user'), updated);
            });
            return next(null, model);
        });
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

 