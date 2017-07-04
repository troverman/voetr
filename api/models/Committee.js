/**
* Committee.js
*
*/

module.exports = {

	attributes: {
        parent: {
            model: 'committee'
        },
        //bills: {
        //    collection: 'bill',
        //    via: 'committee',
        //    dominant: true
        //},
        billCount: {
            type: 'integer',
            defaultsTo: 0
        },
        memberCount: {
            type: 'integer',
            defaultsTo: 0
        },
        officialId: {
            type: 'string',
        },
        title: {
            type: 'string',
            required: true,
            unique: true
        },
        urlTitle: {
            type: 'string',
            required: true,
            unique: true
        },
    },

    beforeCreate: function(values, cb) {
        console.log(values)
        Committee.find({urlTitle:values.urlTitle}).then(function(committeeModel){
            if (committeeModel.length === 0){
                cb();
            }
            else{
                Committee.find({id:values.parent}).then(function(committeeModel){
                    if (committeeModel.length === 0){
                        values.urlTitle = values.urlTitle + '.8';
                        cb();
                    }
                    else{
                        values.urlTitle = committeeModel[0].urlTitle + '-' + values.urlTitle;
                        Committee.find({urlTitle:values.urlTitle}).then(function(committeeModel){
                            if (committeeModel.length === 0){
                                cb();
                            }
                        });
                    }
                });
            }
        });
    },

    getOne: function(id) {
        return Committee.findOne(id)
        .populate('parent')
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return Committee.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .then(function (models) {
            return models;
        });
    },

};

 