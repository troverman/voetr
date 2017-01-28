/**
* Bill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        billContent: {
            type: 'string',
            //required: true
        },
        comments: {
            collection: 'comment',
            via: 'bill'
        },
        //committees
        committee: {
            model: 'committee',
        },
        fullText: {
            type: 'string',
        },
        officialId: {
            type: 'string',
        },
        summary: {
            type: 'string',
        },
        summaryShort: {
            type: 'string',
        },
        title: {
            type: 'string',
            required: true
        },
        urlTitle: {
            type: 'string',
            required: true
        },
        upcoming: {
            type: 'string',
        },
        user: {
            model: 'user',
            required: true
        },
        votes: {
            collection: 'vote',
            via: 'bill'
        },
        voteCount: {
            type: 'integer',
            defaultsTo: 0
        }
    },

    getAll: function() {
        return Bill.find()
        .populate('votes')
        .then(function (models) {
            return [models];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Bill.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('votes')
        .populate('comments')
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

 