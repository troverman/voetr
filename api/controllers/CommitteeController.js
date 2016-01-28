/**
 * CommitteeController
 *
 */

var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Committee.getAll()
		.spread(function(models) {
			Committee.watch(req);
			Committee.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getSome: function(req, res) {
		var limit = req.param('limit');
		var skip = req.param('skip');

		Committee.getSome(limit, skip)
		.then(function(models) {
			Committee.watch(req);
			Committee.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Committee.getOne(req.param('id'))
		.spread(function(model) {
			Committee.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByUrl: function(req, res) {
		console.log(req.param('path'));
		Committee.find()
		.where({urlTitle: req.param('path')})
		.spread(function(model) {
			Post.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		//var userId = req.param('user');
		var parent = req.param('parent');
		var title = req.param('title');
		var urlTitle = req.param('urlTitle');

		var model = {
			parent: parent,
			title: title,
			urlTitle: urlTitle
		};

		Committee.create(model)
		.exec(function(err, committee) {
			if (err) {
				return console.log(err);
			}
			else {
				Committee.publishCreate(committee);
				res.json(committee);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Committee.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Committee.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Committee.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

