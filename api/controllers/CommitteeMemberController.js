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

	getMemberCount: function(req, res) {
		//var filter = {};
		//if (req.query.user){filter = {user:req.query.user}}
		//else if(req.query.committee){filter = {committee:req.query.user}}
		CommitteeMember.count()
		.where({user:req.param('id')})
		.exec(function(err, committeeMemberCount) {
			if (err) {return console.log(err);}
			else{res.json({ committeeMemberCount: committeeMemberCount });}
		});
	},

	getMemberCountByCommittee: function(req, res) {
		CommitteeMember.count()
		.where({user:req.param('id')})
		.exec(function(err, committeeMemberCount) {
			if (err) {return console.log(err);}
			else{res.json({ committeeMemberCount: committeeMemberCount });}
		});
	},

	getCommitteeMemberCount: function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		CommitteeMember.count()
		.where(filter)
		.exec(function(err, committeeMemberCount) {
			if (err) {return console.log(err);}
			else{res.json({ committeeMemberCount: committeeMemberCount });}
		});
	},

	create: function (req, res) {
		var model = {
			title: 'Committee Member',
			committee: req.param('committee'),
			user: req.param('user')
		};
		CommitteeMember.create(model)
		.exec(function(err, member) {
			if (err) {return console.log(err);}
			else {
				CommitteeMember.count()
				.where({committee: req.param('committee')})
				.exec(function(err, committeeMemberCount) {
					console.log(committeeMemberCount);
					Committee.update({id: req.param('committee')}, {memberCount: committeeMemberCount}).exec(function afterwards(err, updated){
						Committee.publishUpdate(req.param('committee'), updated);
					});
				});
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

