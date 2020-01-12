module.exports = {
	attributes: {
        bill: {model: 'bill', required: true},
        minusCount:{type: 'integer'},
        plusCount:{type: 'integer'},
        officialId: {type: 'string'},
        officialUrl: {type: 'string'},
        otherCount:{type: 'integer'},
        required: {type: 'string'},
        result: {type: 'string'},
        type: {type: 'string'},
        officialUrl: {type: 'string'},
        voteCount:{type: 'integer'},
        title: {type: 'string', required: true},
        urlTitle: {type: 'string', required: true},
        user: {model: 'user', required: true},
        //constituientArray
        //voted for by ... -- populated constituent profiles
    },
};

 