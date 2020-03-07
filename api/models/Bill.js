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
    }
};

 