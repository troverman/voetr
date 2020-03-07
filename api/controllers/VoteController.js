module.exports = {
	get: async function(req, res){
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var query = {};
		if (req.query.id){query={id:req.query.id}}
		if (req.query.bill){query={bill:req.query.bill}}
		if (req.query.user){query={user:req.query.user}}
		//TODO: PARSE QUERY PATTERN
		if (req.query.filter){
			var filter = {};
			//PRIMITIVE PARSEQUERY
			if (req.query.filter){
				if (req.query.filter.endDate){
					var startDate = new Date();
					startDate.setMonth(startDate.getDay() - req.query.filter.dayCount);
					filter.createdAt = { '>': startDate, '<': endDate };
				}
				if(req.query.filter.user){filter.user = req.query.filter.user;}
			}
			query = JSON.parse(JSON.stringify(req.query.filter));
		}
		var models = await Vote.find(query).limit(limit).skip(skip).sort(sort).populate('bill').populate('user');
		res.json(models);
	},
	create: async function (req, res) {
		var model = {vote: req.param('vote'), bill: req.param('bill'), user: req.param('user')};
		var newVote = await Vote.create(model);
		//this is total not up plus down
		var voteCount = await Vote.count().where({bill: req.param('bill')})
		var updated = await Bill.update({id: req.param('bill')}, {voteCount:voteCount});
		Vote.watch(req);
		Vote.publishCreate(newVote.toJSON());
		res.json(newVote);
	},
};

