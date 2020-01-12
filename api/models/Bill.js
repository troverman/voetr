module.exports = {
	attributes: {
        committees: {type: 'json'},
        congressGovUrl: {type: 'string'},
        fullText: {type: 'string'},
        keywords: {type: 'string'},
        //members:{collection: 'billmember', via: 'user'},
        //committee:{collection: 'committeebill', via: 'bill'},
        minusCount: {type: 'integer', defaultsTo: 0},
        officialId: {type: 'string'},
        posts: {collection: 'post',via: 'bill'},
        plusCount: {type: 'integer', defaultsTo: 0},
        relatedBills: {type: 'json'},
        summary: {type: 'string'},
        summaryShort: {type: 'string',},
        title: {type: 'string',required: true},
        urlTitle: {type: 'string',required: true},
        upcoming: {type: 'string'},
        user: {model: 'user',required: true},
        votes: {collection: 'vote',via: 'bill' },
        voteCount: {type: 'integer', defaultsTo: 0},
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
        return Bill.find().sort(sort).limit(limiting).skip(skipping).populate('user').populate('votes')
        .then(function (models) {
            return models;
        });
    },
    getByCommittee: function(id, limiting, skipping, sort) {
        return Bill.find().where({committees: {contains: id}}).populate('votes')
        .then(function (models) {
            return models;
        });
    },
};

 