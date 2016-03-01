/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        vote: {
            type: 'integer',
            required: true
        },
        voteString: {
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
        return Bill.find()
        .then(function (models) {
            return [models];
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
        return Bill.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

};

 