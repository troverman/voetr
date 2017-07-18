/**
* CommitteeVote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        vote: {
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

    getOne: function(id) {
        return CommitteeVote.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

};

 