module.exports = {
	getByPost: function(req, res) {
		var post = req.query.user
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		Reaction.getByPost(user, limit, skip, sort)
		.then(function(model) {
			Reaction.watch(req);
			Reaction.subscribe(req, model);
			res.json(model);
		});
	},
	getSome: function(req, res) {
		var filter = req.query.filter
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		Reaction.getSome(filter, limit, skip, sort)
		.then(function(model) {
			Reaction.watch(req);
			Reaction.subscribe(req, model);
			res.json(model);
		});
	},
	getByUser: function(req, res) {
		var user = req.query.user
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		Reaction.getByUser(user, limit, skip, sort)
		.then(function(model) {
			Reaction.watch(req);
			Reaction.subscribe(req, model);
			res.json(model);
		});
	},
	create: async function (req, res) {
		var model = {
			postModel: req.param('postModel'),
			reaction: req.param('reaction'),
			user: req.param('user'),
			voteModel: req.param('postModel'),
		};
		var model = await Reaction.create(model)
		res.json(model);
	},
};

