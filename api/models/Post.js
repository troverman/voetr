/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        title: {
            type: 'string',
            required: true,
            unique: true
        },
        post_content: {
            type: 'string',
            required: true
        },
        other: {
            type: 'string'
        },
        url_title: {
            type: 'string',
            required: true,
            unique: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    getAll: function() {
        return Post.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return Post.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

    //getByUrlTitle: function(a_url_title) {
        //return Post.find({url_title: a_url_title}).exec(function (err, found){})
        //.then(function (model) {
            //return [model];
        //}
        //);
    //}
};

