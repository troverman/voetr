module.exports = {
	get: async function(req, res){
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var query = {};
		if (req.param.id){query = {id:req.param.id}}
		if (req.query.bill){query = {bill:req.param.bill}}
		if (req.query.committee){query = {committee:req.param.committee}}
		if (req.query.post){query = {postModel:req.query.post}}
		if (req.query.profile){query = {profile:req.query.profile}}
		if (req.query.user){query = {profile:req.query.user}}
		if (req.query.vote){query = {profile:req.query.vote}}
		if (req.query.filter){query = JSON.parse(JSON.stringify(req.query.filter))}
		var model = await Post.find(query).limit(100).skip(skip).sort(sort).
		res.json(model);
	},
	create: async function (req, res) {
		var post = req.param('post');
		var postModel = req.param('postModel');
		var bill = req.param('bill');
		var profile = req.param('profile');
		var committee = req.param('committee');
		var user = req.param('user');
		var vote = req.param('vote');
		var meansOfContact = req.param('meansOfContact');
		var model = {
			post: post,
			postModel: postModel,
			bill: bill,
			profile: profile,
			committee: committee,
			user: user,
			vote: vote,
		};
		var model = await Post.create(model);
		var post = await Post.getOne(model.id);
		Post.publishCreate(model[0]);
		res.json(model);	
	},
};

