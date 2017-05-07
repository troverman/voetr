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

    beforeCreate: function(model, next){
        Representative.find({constituent: model.constituent, representative:model.representative})
        .then(function(representative){
            if (representative.length == 0){
                return next(null, representative);
            }
        });
    },

    afterCreate: function(model, next){
        Representative.count()
        .where({constituent: model.constituent})
        .then(function(constituentCount){
            User.update({id: model.constituent}, {representativeCount:constituentCount}).exec(function afterwards(err, updated){
                User.publishUpdate(model.user, updated[0]);
            });
            Representative.count()
            .where({representative: model.representative})
            .then(function(representativeCount){
                User.update({id: model.representative}, {constituentCount:representativeCount}).exec(function afterwards(err, updated){
                    User.publishUpdate(model.user, updated[0]);
                });
                return next();
            });
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

