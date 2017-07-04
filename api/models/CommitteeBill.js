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

    getOne: function(id) {
        return CommitteeBill.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

};

 