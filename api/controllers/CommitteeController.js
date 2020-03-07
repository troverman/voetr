module.exports = {
	//TODO: COMMITTEE-COMMITTEE ASSOCIATION IE PROJECT .. PLURALISM VIA VOETR APP ..
	getChildren: async function(req, res) {
		var model = await Committee.find({parent: req.param('id')}).sort('memberCount DESC')
		Committee.subscribe(req, model);
		res.json(model);
	},
	getCount: async function(req, res) {
		var count = await Committee.count()
		res.json({ count: count });
	},
	get: async function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var filter = req.query.filter || {};
		var models = await Committee.find(filter).limit(limit).skip(skip).sort(sort);
		//Committee.watch(req);
		//Committee.subscribe(req, model);
		res.json(models);
	},
	create: async function (req, res) {
		var parent = req.param('parent');
		var title = req.param('title');
		var urlTitle = req.param('title').replace(' ','-').toLowerCase();
		var user = req.param('user');
		var model = {parent: parent, title: title, urlTitle: urlTitle, user: user};
		var model = await Committee.create(model)
		Committee.publishCreate(committee);
		res.json(committee);
	}
};

