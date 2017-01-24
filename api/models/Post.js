/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        post: {
            type: 'string',
            required: true
        },
        profile: {
            model: 'user',
            required: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    getBySome: function(limiting, skipping, sort) {
        return Post.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .then(function (models) {
            return models;
        });
    },

    getByUser: function(user, limiting, skipping, sort) {
        return Post.find()
        .where({user: user})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .then(function (models) {
            return models;
        });
    },

    getByProfile: function(profile, limiting, skipping, sort) {
        return Post.find()
        .where({profile: profile})
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('user')
        .populate('profile')
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return Post.findOne(id)
        .populate('user')
        .then(function (model) {
            return [model];
        });
    }

};

 