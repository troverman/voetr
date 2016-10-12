/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        comment: {
            type: 'string',
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
        return Comment.find()
        .then(function (models) {
            return [models];
        });
    },

    getByBill: function(bill) {
        return Comment.find()
        .where({bill: bill})
        .sort({createdAt: 'desc'})
        .populate('user')
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return Comment.findOne(id)
        .populate('user')
        .then(function (model) {
            return [model];
        });
    }

};

 