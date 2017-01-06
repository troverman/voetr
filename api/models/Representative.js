/**
* Representative.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        representative: {
            model: 'user',
            required: true
        },
        constituent: {
            model: 'user',
            required: true
        },
        committee: {
            model: 'committee',
            //required: true
        }
    },

    getAll: function() {
        return Representative.find()
        .sort({createdAt: 'desc'})
        .populate('representative')
        .populate('constituent')
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return Representative.findOne(id)
        .populate('representative')
        .populate('constituent')
        .then(function (model) {
            return [model];
        });
    },

    getRepresentatives: function(constituent) {
        return Representative.find()
        .sort({createdAt: 'desc'})
        .populate('representative')
        .populate('constituent')
        .where({constituent: constituent})
        .then(function (model) {
            return [model];
        });
    },

    getConstituents: function(representative) {
        return Representative.find()
        .sort({createdAt: 'desc'})
        .populate('representative')
        .populate('constituent')
        .where({representative: representative})
        .then(function (model) {
            return [model];
        });
    }

};
