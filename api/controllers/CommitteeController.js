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

	getByUrlTitle: function(req, res) {
		Committee.find()
		.where({url_title: req.param('path')})
		.spread(function(model) {
			Post.subscribe(req, model);
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

		Committee.create(model)
		.exec(function(err, committee) {
			if (err) {
				return console.log(err);
			}
			else {
				Committee.publishCreate(committee);
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

