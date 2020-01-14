module.exports = {
	getOne: function(req, res) {
		Bill.getOne(req.param('id'))
		.spread(function(model) {
			Bill.subscribe(req, model);
			res.json(model);
		});
	},
	getByCommittee: function(req, res) {
		var committee = req.query.committee;
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0 ;
		var sort = req.query.sort || 'createdAt DESC';
		/*Committee.find({id:id})
        .then(function(committees){
			console.log(committees)
        	Committee.find({id:committees[0].parent}).then(function(committees){
        		console.log(committees)
        	})
        })*/
  	 	//{ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
		Bill.native(function(err, collection){
			if (err){return res.negotiate(err)}
			collection
			.find({committees:{ $elemMatch:{id: committee}}})
			.sort({voteCount: -1 })
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.toArray(function(err, result){
				if (err){return res.negotiate(err)}
				console.log(result);
				console.log('HELLOOOO')
				return res.json(result);
			});
		});
	},
	getCount: async function(req, res) {
		var billCount = await Bill.count()
		res.json({ billCount: billCount });
	},
	getSome: async function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		//var filter = req.query.filter;
		var models = await Bill.getSome(limit, skip, sort)
		Bill.watch(req);
		Bill.subscribe(req, models);
		res.json(models);
	
	},
	create: function (req, res) {
		var billContent = req.param('billContent');
		var committee = req.param('committee');
		var title = req.param('title');
		var user = req.param('user');
		var model = {
			billContent: billContent,
			committee: committee,
			title: title,
			urlTitle: title.replace(/ /g,"-").toLowerCase(),
			user: user
		};
		var bill = await Bill.create(model);
		Bill.publishCreate(bill);
		res.json(bill);	
	},
};

