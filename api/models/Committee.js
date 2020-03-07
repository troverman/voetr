module.exports = {
	attributes: {
        parent: {model: 'committee'},
        billCount: {type: 'integer', defaultsTo: 0},
        memberCount: {type: 'integer', defaultsTo: 0},
        ocdDivision: {type: 'string'},
        officialId: {type: 'string'},
        title: {type: 'string', required: true, unique: true},
        urlTitle: {type: 'string', required: true, unique: true},
    },
    beforeCreate: async  function(values, cb) {
       var model = await  Committee.find({urlTitle:values.urlTitle});
        if (model.length === 0){cb();}
        else{
            var parentModel = await Committee.find({id:values.parent});
            if (parentModel.length === 0){values.urlTitle = values.urlTitle + '.8'; cb();}
            else{
                values.urlTitle = parentModel[0].urlTitle + '-' + values.urlTitle;
                var committeeModel = await Committee.find({urlTitle:values.urlTitle});
                if (committeeModel.length === 0){cb();}
            }
        }
    }
};

 