/**
* Bill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        comments: {
            collection: 'comment',
            via: 'bill'
        },
        committees: {
            type: 'json',
        },
        //committees: {
        //    collection: 'committee',
        //    via: 'bills'
        //},
        //committee:{
        //    collection: 'committee',
        //    via: 'bills'
        //},
        fullText: {
            type: 'string',
        },
        keywords: {
            type: 'string',
        },
        officialId: {
            type: 'string',
        },
        relatedBills: {
            type: 'json',
        },
        summary: {
            type: 'string',
        },
        summaryShort: {
            type: 'string',
        },
        title: {
            type: 'string',
            required: true
        },
        urlTitle: {
            type: 'string',
            required: true
        },
        upcoming: {
            type: 'string',
        },
        user: {
            model: 'user',
            required: true
            //collection: 'user',
            //via: 'bills',
        },
        votes: {
            collection: 'vote',
            via: 'bill'
        },
        voteCount: {
            type: 'integer',
            defaultsTo: 0
        }
    },

    getAll: function() {
        return Bill.find()
        .populate('votes')
        .then(function (models) {
            return [models];
        });
    },

    getByCommittee: function(id, limiting, skipping, sort) {
        //SHOULD HAVE AS A MANY TO MANY RELATION VS JSON STORE
        //is the bill in a child committee??
        //we only have commitee.parent..-->
        //committee.parent == id --> find all the parents of the committee
        //Committee.find({parent:id})
        //.then(function(committees){
        //    console.log(committees)
        //})

        //us.id
        //$in id or any 

        return Bill.find()
        .where({committees: {contains: id}})
        //.sort(sort)
        //.limit(limiting)
        //.skip(skipping)
        .populate('comments')
        //.populate('committees')
        //.populate('relatedBills')
        .populate('votes')
        .then(function (models) {
            return models;
        });
        

        /*return Bill.native(function(err, collection){
            if (err){return res.negotiate(err)}

            return collection
            .find({committees:id})
            .sort(sort)
            .limit(parseInt(limiting))
            .skip(parseInt(skipping))
            //.populate('comments')
            //.populate('committees')
            //.populate('relatedBills')
            //.populate('votes')
            //.toArray(function(err, results){
            //    if (err){return res.negotiate(err)
            //    return results;
            //})
            //.then(function (models) {
            //    return models;
            //});
        })*/


    },

    getSome: function(limiting, skipping, sort) {
        return Bill.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .populate('comments')
        //.populate('committees')
        .populate('user')
        .populate('votes')
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return Bill.findOne(id)
        .populate('comments')
        //.populate('committees')
        .populate('user')
        .populate('votes')
        .then(function (model) {
            return [model];
        });
    }

};

 