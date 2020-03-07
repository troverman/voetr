module.exports = {
	//TODO: ASSOCIATIONS..
	get: async function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		var filter = req.query.filter || {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		var models = await CommitteeMember.find(filter).limit(limit).skip(skip).sort(sort);
		res.json(models);
	},
	getCommitteeMemberCount: async function(req, res) {
		var filter = {};
		if (req.query.filter == 'user'){filter = {user: req.query.id}}
		else if(req.query.filter == 'committee'){filter = {committee: req.query.id}}
		else{filter = {id: null}}
		var committeeMemberCount = await CommitteeMember.count().where(filter);
		res.json({ count: count });
	},
	create: async function (req, res) {
		var model = {title: 'Committee Member', committee: req.param('committee'), user: req.param('user')};
		var member = await CommitteeMember.create(model)
		var committeeMember = await CommitteeMember.find({id:member.id})
		CommitteeMember.publishCreate(committeeMember);
		res.json(committeeMember);
	},	
};

