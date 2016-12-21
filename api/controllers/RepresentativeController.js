/**
 * RepresentativeController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Representative.getAll()
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Representative.getOne(req.param('id'))
		.spread(function(model) {
			Representative.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getConstituents: function(req, res) {
		var representative = req.param('id');
		Representative.getConstituents(representative)
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getRepresentatives: function(req, res) {
		var constituent = req.param('id');
		Representative.getRepresentatives(constituent)
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	create: function (req, res) {

		var representative = req.param('representative');
		var constituent = req.param('constituent');
		var committee = req.param('committee');

		var model = {
			representative: representative,
			constituent: constituent,
			committee: committee,

		};

		Representative.create(model)
		.exec(function(err, representative) {
			if (err) {
				return console.log(err);
			}
			else {
				Representative.getOne(representative.id).then(function(representative){
					Representative.publishCreate(representative[0]);
					res.json(representative[0]);
				});
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Representative.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Representative.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Representative.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

