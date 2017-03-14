/**
* CommentVote.js
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

    getOne: function(id) {
        return CommentVote.findOne(id)
        .populate('user')
        .then(function (model) {
            return [model];
        });
    },

    getByBill: function(bill) {
        return CommentVote.find()
        .where({bill: bill})
        .sort({createdAt: 'desc'})
        .populate('user')
        .then(function (models) {
            return models;
        });
    },

};

 