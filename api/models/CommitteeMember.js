/**
* CommitteeMember.js
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

    getOne: function(id) {
        return CommitteeMember.findOne(id)
        .then(function (model) {
            return model;
        });
    },

    getSome: function(filter, limit, skip, sort){
        return CommitteeMember.find(filter)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .populate('committee')
        .populate('user')
        .then(function (model) {
            return model;
        });
    },

};

 