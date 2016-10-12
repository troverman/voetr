/**
 * CommentController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Comment.getAll()
		.spread(function(models) {
			Comment.watch(req);
			Comment.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Comment.getOne(req.param('id'))
		.spread(function(model) {
			Comment.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByBill: function(req, res) {
		Comment.getByBill(req.param('id'))
		.then(function(model) {
			Comment.watch(req);
			Comment.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var comment = req.param('comment');
		var bill = req.param('bill');
		var user = req.param('user');

		var model = {
			comment: comment,
			bill: bill,
			user: user
		};

		Comment.create(model)
		.exec(function(err, comment) {
			if (err) {
				return console.log(err);
			}
			else {
				Comment.getOne(comment.id).then(function(comment){
					Comment.publishCreate(comment[0]);
					res.json(comment[0]);
				})
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Comment.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Comment.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Comment.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

