/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		CommitteeVote.getAll()
		.spread(function(models) {
			CommitteeVote.watch(req);
			CommitteeVote.subscribe(req, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		CommitteeVote.getOne(req.param('id'))
		.spread(function(model) {
			CommitteeVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var userId = req.param('user');
		var model = {
			title: req.param('title'),
			user: userId
		};

		CommitteeVote.create(model)
		.exec(function(err, CommitteeVote) {
			if (err) {
				return console.log(err);
			}
			else {
				CommitteeVote.publishCreate(CommitteeVote);
				res.json(post);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		CommitteeVote.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			CommitteeVote.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				CommitteeVote.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

