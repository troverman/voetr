/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        vote: {
            type: 'string',
            required: true
        },
        committee: {
            model: 'committee',
            required: true
        },
        user: {
            model: 'user',
            required: true
        }
    },

    getAll: function() {
        return CommitteeVote.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return CommitteeVote.findOne(id)
        .then(function (model) {
            return [model];
        });
    }

    //getByCommittee: function(a_url_title) {
        //return Committee.find({url_title: a_url_title}).exec(function (err, found){})
        //.then(function (model) {
            //return [model];
        //}
        //);
    //}

};

 