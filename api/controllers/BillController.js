module.exports = {
	getCount: async function(req, res) {
		var billCount = await Bill.count();
		res.json({ billCount: billCount });
	},
	get: async function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var filter = req.query.filter || {}
		var models = await Bill.find(filter).limit(limit).skip(skip).sort(sort);
		res.json(models);
	},
	getByCommittee: function(req, res) {
		var committee = req.query.committee;
  	 	//{ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
		Bill.native(function(err, bill){
			if (err){return res.negotiate(err)}
			bill.find({committees:{ $elemMatch:{id: committee}}}).sort({voteCount: -1 }).skip(parseInt(skip)).limit(parseInt(limit))
			.toArray(function(err, result){
				if (err){return res.negotiate(err)}
				console.log(result);
				res.json(result);
			});
		});
	},
	create: async function (req, res) {
		var billContent = req.param('billContent');
		var committee = req.param('committee');
		var title = req.param('title');
		var user = req.param('user');
		var model = { billContent: billContent, committee: committee, title: title, urlTitle: title.replace(/ /g,"-").toLowerCase(), user: user};
		Bill.create(model);
		var bill = await Bill.publishCreate(bill);
		res.json(bill);
	},	
};

