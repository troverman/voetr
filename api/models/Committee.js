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
        url_title: {
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

    getOne: function(id) {
        return Committee.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

};

 