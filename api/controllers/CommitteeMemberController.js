/**
 * CommitteeMemberController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getByCommittee: function(req, res) {
		CommitteeMember.find()
		.where({committee: req.param('id')})
		.populate('user')
		.then(function(models) {
			CommitteeMember.watch(req);
			res.json(models);
		})
		.fail(function(err) {
			res.send(404,err);
		});
	},

	getByMember: function(req, res) {
		CommitteeMember.find()
		.where({user: req.param('id')})
		.populate('user')
		.populate('committee')
		.then(function(models) {
			CommitteeMember.watch(req);
			res.json(models);
		})
		.fail(function(err) {
			res.send(404,err);
		});
	},

	create: function (req, res) {
		//var title = req.param('title');
		var committee = req.param('committee');
		var user = req.param('user');

		var model = {
			title: 'member',
			committee: committee,
			user: user
		};

		CommitteeMember.create(model)
		.exec(function(err, member) {
			if (err) {
				return console.log(err);
			}
			else {
				CommitteeMember.publishCreate(member);
				res.json(member);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}
		CommitteeMember.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			CommitteeMember.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				CommitteeMember.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

