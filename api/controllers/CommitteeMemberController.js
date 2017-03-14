/**
 * CommitteeMemberController
 * @description :: Server-side logic for managing CommitteeMembers
 */

module.exports = {

	getByCommittee: function(req, res) {
		var committee = req.query.committee;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		CommitteeMember.find()
		.where({committee: committee})
		.limit(limit)
		.skip(skip)
		.skip(sort)
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
		var user = req.query.user;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		CommitteeMember.find()
		.where({user: user})
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
			title: 'Committee Member',
			committee: committee,
			user: user
		};
		CommitteeMember.create(model)
		.exec(function(err, member) {
			if (err) {return console.log(err);}
			else {
				CommitteeMember.publishCreate(member);
				res.json(member);
			}
		});
	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		CommitteeMember.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			CommitteeMember.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				CommitteeMember.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

