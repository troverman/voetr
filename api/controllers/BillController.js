/**
 * BillController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Bill.getAll()
		.spread(function(models) {
			Bill.watch(req);
			Bill.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Bill.getOne(req.param('id'))
		.spread(function(model) {
			Bill.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getCount: function(req, res) {
		Bill.count()
		.exec(function(err, billCount) {
			if (err) {
				return console.log(err);
			}
			else{
				res.json({ billCount: billCount });
			}
		});
	},

	getSome: function(req, res) {
		var limit = req.param('limit');
		var skip = req.param('skip');
		var sort = req.param('sort');
		Bill.getSome(limit, skip, sort)
		.then(function(models) {
			Bill.watch(req);
			Bill.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	create: function (req, res) {
		var billContent = req.param('billContent');
		var committee = req.param('committee');
		var title = req.param('title');
		var user = req.param('user');

		var model = {
			billContent: billContent,
			committee: committee,
			title: title,
			urlTitle: title.replace(/ /g,"-").toLowerCase(),
			user: user
		};

		Bill.create(model)
		.exec(function(err, bill) {
			if (err) {
				return console.log(err);
			}
			else {
				Bill.publishCreate(bill);
				res.json(bill);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Bill.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Bill.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Bill.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

