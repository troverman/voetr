/**
 * CommitteeBillController
 * @description :: Server-side logic for managing CommitteeMembers
 */

module.exports = {

	getSome: function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		CommitteeBill.getSome(filter, req.query.limit, req.query.skip, req.query.sort)
		.then(function(models) {
			CommitteeMember.watch(req);
			res.json(models);
		})
		.fail(function(err) {
			res.send(404,err);
		});
	},

	getCommitteeBillCount: function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		CommitteeBill.count()
		.where(filter)
		.exec(function(err, committeeMemberCount) {
			if (err) {return console.log(err);}
			else{res.json({ committeeMemberCount: committeeMemberCount });}
		});
	},

	create: function (req, res) {
		var model = {
			bill: req.param('bill'),
			committee: req.param('committee'),
		};
		CommitteeBill.create(model)
		.exec(function(err, member) {
			if (err) {return console.log(err);}
			else {
				CommitteeBill.getOne(member.id).then(function(committeeMember){
					CommitteeBill.publishCreate(committeeMember);
					res.json(committeeMember);
				});
			}
		});
	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		CommitteeBill.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			CommitteeBill.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				CommitteeBill.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

