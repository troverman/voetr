module.exports = {
	get: function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var filter = req.query.filter || {};
		var models = await Reaction.find(filter).limit(limit).skip(skip).sort(sort);
		//Reaction.watch(req);
		//Reaction.subscribe(req, model);
		res.json(models);
	},
	create: async function (req, res) {
		var model = {postModel: req.param('postModel'), reaction: req.param('reaction'), user: req.param('user'), voteModel: req.param('postModel'),};
		var model = await Reaction.create(model)
		res.json(model);
	},
};

