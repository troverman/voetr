/**
 * ReactionController
 * @description :: Server-side logic for managing BillVotes
 */

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
		})
		.fail(function(err) {
			res.send(404);
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
		})
		.fail(function(err) {
			res.send(404);
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
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var model = {
			postModel: req.param('postModel'),
			reaction: req.param('reaction'),
			user: req.param('user'),
			voteModel: req.param('postModel'),
		};

		console.log(model);
		
		Reaction.create(model)
		.exec(function(err, model) {
			if (err) {return console.log(err);}
			else {
				//Reaction
			}
		});

	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		Reaction.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			Reaction.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				Reaction.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}

};

