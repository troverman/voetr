module.exports = {
	getOne: function(req, res) {
		Committee.getOne(req.param('id'))
		.spread(function(model) {
			Committee.subscribe(req, model);
			res.json(model);
		});
	},
	getSome: async function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		var models = await Committee.getSome(limit, skip, sort);
		Committee.watch(req);
		Committee.subscribe(req, models);
		res.json(models);
	},
	getChildren: function(req, res) {
		Committee.find().where({parent: req.param('id')}).sort('memberCount DESC')
		.then(function(model) {
			Committee.subscribe(req, model);
			res.json(model);
		});
	},
	getCount: async function(req, res) {
		var committeeCount = await Committee.count()
		res.json({ committeeCount: committeeCount });
	},
	getByUrl: function(req, res) {
		Committee.find()
		.where({urlTitle: req.param('path')})
		.populate('parent')
		.spread(function(model) {
			Committee.subscribe(req, model);
			res.json(model);
		});
	},
	create: async function (req, res) {
		var parent = req.param('parent');
		var title = req.param('title');
		var urlTitle = req.param('title').replace(' ','-').toLowerCase();
		var user = req.param('user');
		var model = {
			parent: parent,
			title: title,
			urlTitle: urlTitle,
			user: user
		};
		var model = await Committee.create(model)
		Committee.publishCreate(committee);
		res.json(committee);
	},
};

