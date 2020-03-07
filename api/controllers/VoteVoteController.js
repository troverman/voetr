module.exports = {
	get: async function(req, res){
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var query = {};
		if (req.query.id){query={id:req.query.id}}
		if (req.query.bill){query={bill:req.query.bill}}
		if (req.query.user){query={user:req.query.user}}
		if (req.query.vote){query={vote:req.query.vote}}
		if (req.query.filter){query = JSON.parse(JSON.stringify(req.query.filter))}
		var models = await VoteVote.find(query).limit(limit).skip(skip).sort(sort);
		res.json(models);
	},
	//FACTOR
	getUserCount: async function(req, res) {
		var voteCount = await VoteVote.count().where({user:req.param('id')});
		res.json({ voteCount: voteCount });
	},
	create: async function (req, res) {
		var model = {
			bill: req.param('bill'),
			user: req.param('user'),
			vote: req.param('vote'),
			voteInteger: req.param('voteInteger'),
		};
		if (req.param('voteInteger') == 1){model.voteString = "Yes"}
		if (req.param('voteInteger') == -1){model.voteString = "No"}
		var newVoteVote = await VoteVote.create(model)
		var voteVote = await VoteVote.find({id:newVoteVote.id});
		VoteVote.publishCreate(voteVote[0]);
		contactService.sendEmail(voteVote[0]);
		contactService.sendFax(voteVote[0]);
		contactService.sendMail(voteVote[0])
		res.json(voteVote[0]);
	},	
};

