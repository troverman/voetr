/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        result: {
            type: 'string'
        },
        required: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        voteCount:{
            type: 'integer'
        },
        plusCount:{
            type: 'integer'
        },
        minusCount:{
            type: 'integer'
        },
        otherCount:{
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
        displayId: {
            type: 'string',
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
        return Vote.find()
        .then(function (models) {
            return [models];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Vote.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('bill')
        .then(function (models) {
            return models;
        });
    },

    getByBill: function(bill) {
        return Vote.find()
        .where({bill: bill})
        .sort({createdAt: 'desc'})
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
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return Vote.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

};

 