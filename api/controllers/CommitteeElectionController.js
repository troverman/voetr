/**
 * CommitteeElectionController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		CommitteeElection.getAll()
		.spread(function(models) {
			CommitteeElection.watch(req);
			CommitteeElection.subscribe(req, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		CommitteeElection.getOne(req.param('id'))
		.spread(function(model) {
			CommitteeElection.subscribe(req, model);
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

		CommitteeElection.create(model)
		.exec(function(err, CommitteeElection) {
			if (err) {
				return console.log(err);
			}
			else {
				CommitteeElection.publishCreate(CommitteeElection);
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
		CommitteeElection.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			CommitteeElection.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				CommitteeElection.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

