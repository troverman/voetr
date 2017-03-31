/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        post: {
            type: 'string',
            required: true
        },
        title: {
            type: 'string',
        },
        bill: {
            model: 'bill',
        },
        committee: {
            model: 'committee',
        },
        postModel: {
            model: 'post',
        },
        profile: {
            model: 'user',
        },
        vote: {
            model: 'vote',
        },
        user: {
            model: 'user',
            required: true
        }
    },

    //afterCreate --> tag users? or save as an attribute. 

    getOne: function(id) {
        return Post.findOne(id)
        .populate('user')
        .populate('user')
        .populate('profile')
        .populate('committee')
        .populate('bill')
        .populate('vote')
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Post.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .populate('committee')
        .populate('bill')
        .populate('vote')
        .then(function (models) {
            return models;
        });
    },

    getByBill: function(bill, limiting, skipping, sort) {
        return Post.find()
        .where({bill: bill})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('bill')
        .then(function (models) {
            return models;
        });
    },

    getByCommittee: function(committee, limiting, skipping, sort) {
        return Post.find()
        .where({committee: committee})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('committee')
        .then(function (models) {
            return models;
        });
    },

    getByProfile: function(profile, limiting, skipping, sort) {
        return Post.find()
        .where({profile: profile})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .then(function (models) {
            return models;
        });
    },

    getByUser: function(user, limiting, skipping, sort) {
        return Post.find()
        .where({user: user})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .then(function (models) {
            return models;
        });
    },

    getByVote: function(vote, limiting, skipping, sort) {
        return Post.find()
        .where({vote: vote})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('vote')
        .then(function (models) {
            return models;
        });
    },

};

 