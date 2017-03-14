/**
 * VoteController
 * @description :: Server-side logic for managing Votes
 */

module.exports = {

	getOne: function(req, res) {
		Vote.getOne(req.param('id'))
		.spread(function(model) {
			Vote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getSome: function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		Vote.getSome(limit, skip, sort)
		.then(function(models) {
			Vote.watch(req);
			Vote.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getByBill: function(req, res) {
		Vote.getByBill(req.param('id'))
		.then(function(model) {
			Vote.watch(req);
			Vote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByUser: function(req, res) {
		Vote.getByUser(req.param('id'))
		.then(function(model) {
			Vote.watch(req);
			Vote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var model = {
			vote: req.param('vote'),
			bill: req.param('bill'),
			user: req.param('user')
		};
		console.log(req.param('bill'));
		Vote.create(model)
		.exec(function(err, model) {
			if (err) {return console.log(err);}
			else {
				//this is total not up plus down
				Vote.count()
				.where({bill: req.param('bill')})
				.exec(function(err, voteCount) {
					console.log(voteCount)
					Bill.update({id: req.param('bill')}, {voteCount:voteCount}).exec(function afterwards(err, updated){
					  if (err) {return;}
					});
				});
				Vote.watch(req);
				Vote.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		Vote.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			Vote.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				Vote.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

