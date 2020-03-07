module.exports = {
	attributes: {
        result:{type: 'string'},
        required:{type: 'string'},
        type:{type: 'string'},
        voteCount:{type: 'integer'},
        plusCount:{type: 'integer'},
        minusCount:{type: 'integer'},
        otherCount:{type: 'integer'},
        title:{type: 'string', required: true},
        urlTitle:{type: 'string', required: true},
        displayId:{type: 'string',},
        bill:{model: 'bill', required: true},
        user:{model: 'user', required: true}
    }
};

 