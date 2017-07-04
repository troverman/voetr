/**
* Bill.js
*
*/

module.exports = {

	attributes: {
        committees: {
            type: 'json',
        },
        //committee:{
        //    collection: 'committeebill',
        //    via: 'bill'
        //},
        congressGovUrl: {
            type: 'string',
        },
        fullText: {
            type: 'string',
        },
        keywords: {
            type: 'string',
        },
        //members:{
        //  collection: 'billmember',
        //  via: 'user'
        //},
        minusCount: {
            type: 'integer',
            defaultsTo: 0
        },
        officialId: {
            type: 'string',
        },
        posts: {
            collection: 'post',
            via: 'bill'
        },
        plusCount: {
            type: 'integer',
            defaultsTo: 0
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
        user: {//members --
            model: 'user',
            required: true
        },
        votes: {
            collection: 'vote',
            via: 'bill'
        },
        voteCount: {
            type: 'integer',
            defaultsTo: 0
        },
    },

    getOne: function(id) {
        return Bill.findOne(id)
        //.populate('committees')
        //.populate('posts')
        .populate('user')
        .populate('votes')
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort) {
        //filter == {filterType: filterParam}
        //Bill.find(filter)
        return Bill.find()
        //.where(filter)
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        //.populate('committees')
        //.populate('posts')
        .populate('user')
        .populate('votes')
        .then(function (models) {
            return models;
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

};

 