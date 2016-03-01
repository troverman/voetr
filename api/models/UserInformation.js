/**
* UserInformation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
    attributes: {
        userId: {
            type: 'string',
            required: true,
            unique: true
        }
    },

    getAll: function() {
        return UserInformation.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return UserInformation.findOne(id)
        .then(function (model) {
            return [model];
        });
    }
};