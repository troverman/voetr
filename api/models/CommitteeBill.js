/**
* CommitteeBill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        committee: {
            model: 'committee',
            required: true
        },
        bill: {
            model: 'bill',
            required: true
        }
    },

    afterCreate: function(model, next){
        CommitteeBill.count()
        .where({committee: model.committee})
        .then(function(committeeBillCount){
            console.log(committeeBillCount);
            Committee.update({id: model.committee}, {billCount: committeeBillCount}).then(function(updated){
                console.log('Committee Bill Count Updated')
                Committee.publishUpdate(model.committee, updated[0]);
            });
        });
        /*CommitteeBill.count()
        .where({user: model.user})
        .then(function(committeeBillCount){
            User.update({id: model.user}, {committeeCount:committeeBillCount}).exec(function afterwards(err, updated){
                User.publishUpdate(model.user, updated[0]);
            });
        });*/
        return next();
    },

    getOne: function(id) {
        return CommitteeBill.findOne(id)
        .then(function (model) {
            return model;
        });
    },

    getSome: function(limit, skip, sort, filter){
        return CommitteeBill.find()
        .where(JSON.parse(filter))
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .populate('bill')
        .populate('committee')
        .then(function (model) {
            return model;
        });
    },

};

 