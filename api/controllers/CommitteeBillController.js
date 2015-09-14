/**
 * CommitteeBillController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		CommitteeBill.getAll()
		.spread(function(models) {
			CommitteeBill.watch(req);
			CommitteeBill.subscribe(req, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		CommitteeBill.getOne(req.param('id'))
		.spread(function(model) {
			CommitteeBill.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var bill_content = req.param('bill_content');
		var committee = req.param('committee');
		var title = req.param('title');
		var user = req.param('user');

		var model = {
			bill_content: bill_content,
			committee: committee,
			title: title,
			user: user
		};

		CommitteeBill.create(model)
		.exec(function(err, committee_bill) {
			if (err) {
				return console.log(err);
			}
			else {
				CommitteeBill.publishCreate(committee_bill);
				res.json(committee_bill);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		CommitteeBill.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			CommitteeBill.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				CommitteeBill.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

