/**
* CommitteeBill.js
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

    afterCreate: function (committee, next) {
        // set message.user = to appropriate user model
        CommitteeBill.getOne(committee.user)
        .spread(function(user) {
            committee.user = user;
            next(null, committee);
        });
    },

    getOne: function(id) {
        return CommitteeBill.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

};

 