/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getOne: function(req, res) {
		Post.getOne(req.param('id'))
		.spread(function(model) {
			Post.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByProfile: function(req, res) {
		var profile = req.param('profile');
		var limit = req.param('limit');
		var skip = req.param('skip');
		var sort = req.param('sort');
		Post.getByProfile(profile, limit, skip, sort)
		.then(function(models) {
			Post.watch(req);
			Post.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getByUser: function(req, res) {
		var user = req.param('user');
		var limit = req.param('limit');
		var skip = req.param('skip');
		var sort = req.param('sort');
		Post.getByUser(user, limit, skip, sort)
		.then(function(models) {
			Post.watch(req);
			Post.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getSome: function(req, res) {
		var limit = req.param('limit');
		var skip = req.param('skip');
		var sort = req.param('sort');
		Post.getSome(limit, skip, sort)
		.then(function(models) {
			Post.watch(req);
			Post.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	create: function (req, res) {
		var post = req.param('post');
		var profile = req.param('profile');
		var user = req.param('user');
		var meansOfContact = req.param('meansOfContact');

		var model = {
			post: post,
			profile: profile,
			user: user,
			//meansOfContact: meansOfContact
		};
		console.log(model)
		Post.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				Post.getOne(model.id).then(function(model){
					Post.publishCreate(model[0]);
					res.json(model);
				});
			}
		});
	},

	update: function (req, res) {
		var post = req.param('post');
		var profile = req.param('profile');
		var user = req.param('user');
		var meansOfContact = req.param('meansOfContact');

		var model = {
			post: post,
			profile: profile,
			user: user,
			//meansOfContact: meansOfContact
		};

		Post.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				Post.publishCreate(model[0]);
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
		Post.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			Post.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				Post.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

