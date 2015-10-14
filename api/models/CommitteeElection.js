/**
* CommitteElection.js
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
        committee: {
            model: 'committee',
            required: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    getAll: function() {
        return CommitteElection.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return CommitteElection.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

};

 