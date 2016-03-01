/**
* Bill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        title: {
            type: 'string',
            required: true
        },
        displayNumber: {
            type: 'string',
        },
        billContent: {
            type: 'string',
            required: true
        },
        committee: {
            model: 'committee'//,
            //required: true
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
        //.sort(sort)
        .limit(limiting)
        .skip(skipping)
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

 