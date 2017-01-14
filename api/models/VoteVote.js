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

    getAll: function() {
        return VoteVote.find()
        .then(function (models) {
            return [models];
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

    getOne: function(id) {
        return VoteVote.findOne(id)
        .populate('bill')
        .populate('user')
        .populate('vote')
        .then(function (model) {
            return [model];
        });
    }

};

 