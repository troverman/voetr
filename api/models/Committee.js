/**
* Committee.js
*
*/

module.exports = {

	attributes: {
        parent: {
            model: 'committee'
        },
        //bills: {
        //    collection: 'bill',
        //    via: 'committee',
        //    dominant: true
        //},
        memberCount: {
            type: 'integer',
            defaultsTo: 0
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

    getOne: function(id) {
        return Committee.findOne(id)
        .populate('parent')
        .then(function (model) {
            return [model];
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

};

 