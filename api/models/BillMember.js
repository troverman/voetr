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
    },
    getOne: function(id) {
        return BillMember.findOne(id).populate('bill')
        .then(function (model) {return [model];});
    },
    getSome: function(limiting, skipping, sort) {
        return BillMember.find().sort(sort).limit(limiting).skip(skipping).populate('bill')
        .then(function (models) {return models;});
    },
    getByBill: function(bill) {
        return BillMember.find().where({bill: bill}).sort({createdAt: 'desc'}).populate('user').populate('bill')
        .then(function (models) {return models;});
    },
    getByUser: function(user) {
        return BillMember.find().where({user: user}).sort({createdAt: 'desc'}).populate('bill')
        .then(function (models) {return models;});
    },
};

 