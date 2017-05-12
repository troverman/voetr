/**
 * CommitteeMemberController
 * @description :: Server-side logic for managing CommitteeMembers
 */

module.exports = {

	getSome: function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		CommitteeMember.getSome(filter, req.query.limit, req.query.skip, req.query.sort)
		.then(function(models) {
			CommitteeMember.watch(req);
			res.json(models);
		})
		.fail(function(err) {
			res.send(404,err);
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
				CommitteeMember.getOne(member.id).then(function(committeeMember){
					CommitteeMember.publishCreate(committeeMember);
					res.json(committeeMember);
				});
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

