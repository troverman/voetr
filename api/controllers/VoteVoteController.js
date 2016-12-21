/**
 * VoteVoteController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		VoteVote.getAll()
		.spread(function(models) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getByBill: function(req, res) {
		VoteVote.getByBill(req.param('id'))
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByVote: function(req, res) {
		VoteVote.getByVote(req.param('id'))
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByUser: function(req, res) {
		var id = req.param('id');
		var limit = req.param('limit');
		var skip = req.param('skip');
		var sort = req.param('sort');
		VoteVote.getByUser(id, limit, skip, sort)
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getOne: function(req, res) {
		VoteVote.getOne(req.param('id'))
		.spread(function(model) {
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getUserCount: function(req, res) {
		VoteVote.count()
		.where({user:req.param('id')})
		.exec(function(err, voteCount) {
			if (err) {
				return console.log(err);
			}
			else{
				res.json({ voteCount: voteCount });
			}
		});
	},

	create: function (req, res) {
		var model = {
			bill: req.param('bill'),
			user: req.param('user'),
			vote: req.param('vote'),
			voteInteger: req.param('voteInteger'),
			voteString: req.param('voteString'),
		};
		console.log(model)

		VoteVote.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				//this is total not up plus down
				//need to restructure this
				VoteVote.count()
				.where({vote: req.param('vote')})
				.exec(function(err, VoteVoteCount) {
					console.log(VoteVoteCount)
					Vote.update({id: req.param('vote')}, {voteCount:VoteVoteCount}).exec(function afterwards(err, updated){
					  if (err) {
					    return;
					  }
					});
				});
				VoteVote.watch(req);
				VoteVote.publishCreate(model.toJSON());
				res.json(model);
			}
		});

	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		VoteVote.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			VoteVote.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				VoteVote.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

