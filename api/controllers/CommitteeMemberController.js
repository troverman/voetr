module.exports = {
	getSome: async function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		var models = await CommitteeMember.getSome(filter, req.query.limit, req.query.skip, req.query.sort)
		CommitteeMember.watch(req);
		res.json(models);
	},
	getCommitteeMemberCount: async function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		var committeeMemberCount = await CommitteeMember.count().where(filter);
		res.json({ committeeMemberCount: committeeMemberCount });
	},
	create: async function (req, res) {
		var model = {
			title: 'Committee Member',
			committee: req.param('committee'),
			user: req.param('user')
		};
		var member = await CommitteeMember.create(model)
		var committeeMember = await CommitteeMember.find({id:member.id})
		CommitteeMember.publishCreate(committeeMember);
		res.json(committeeMember);
	},	
};

