/**
* Committee.js
*
*/

module.exports = {

	attributes: {
        parent: {
            model: 'committee'
        },
        officialId: {
            type: 'string',
        },
        title: {
            type: 'string',
            required: true,
            unique: true
        },
        urlTitle: {
            type: 'string',
            required: true,
            unique: true
        },
    },

    getAll: function() {
        return Committee.find()
        .then(function (models) {
            return [models];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Committee.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return Committee.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

};

 