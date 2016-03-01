/**
* Committee.js
*
*/

module.exports = {

	attributes: {
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
        parent: {
            model: 'committee'
        }
    },

    getAll: function() {
        return Committee.find()
        .then(function (models) {
            return [models];
        });
    },

    getSome: function(limiting, skipping) {
        return Committee.find()
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

 