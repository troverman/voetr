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

    beforeCreate: function(model, next){
        CommitteeMember.find({committee: model.committee, user:model.user})
        .then(function(committeeMember){
            if (committeeMember.length == 0){
                return next(null, committeeMember);
            }
        });
    },

    /*afterCreate: function(model, next){
        CommitteeMember.count()
        .where({committee: model.committee, user:model.user})
        .then(function(committeeMemberCount){
            Committee.update({id: model.committee, memberCount: committeeMemberCount}).then(function(updated){
                Committee.publishUpdate(model.committee, updated);
                return next();
            });
        });
    },*/

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

 