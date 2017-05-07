/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        bill: {
            model: 'bill',
            required: true
        },
        minusCount:{
            type: 'integer'
        },
        plusCount:{
            type: 'integer'
        },
        officialId: {
            type: 'string'
        },
        officialUrl: {
            type: 'string'
        },
        otherCount:{
            type: 'integer'
        },
        required: {
            type: 'string'
        },
        result: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        officialUrl: {
            type: 'string',
        },
        voteCount:{
            type: 'integer'
        },
        title: {
            type: 'string',
            required: true
        },
        urlTitle: {
            type: 'string',
            required: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    getOne: function(id) {
        return Vote.findOne(id)
        .populate('bill')
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Vote.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('bill')
        .then(function (models) {

            //models.forEach(function(model) {
                //var id = req.session.user.id;
                //VoteVote.find({vote:model.vote, bill:model.bill, user:req.session.user.id})
                //.then(function(model) {
                //    console.log(model)
                //});
            //});

            return models;
        });
    },

    getByBill: function(bill) {
        return Vote.find()
        .where({bill: bill})
        .sort({createdAt: 'desc'})
        .populate('bill')
        .populate('user')
        .then(function (models) {
            return models;
        });
    },

    getByUser: function(user) {
        return Vote.find()
        .where({user: user})
        .sort({createdAt: 'desc'})
        .populate('bill')
        .populate('user')
        .then(function (models) {
            return models;
        });
    },
};

 