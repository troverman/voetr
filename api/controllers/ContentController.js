module.exports = {
	get: async function(req, res){
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var query = {};
		if (req.param.id){query = {id:req.param.id}}
		if (req.query.bill){query = {bill:req.param.bill}}
		if (req.query.committee){query = {committee:req.param.committee}}
		if (req.query.content){query = {ContentModel:req.query.content}}
		if (req.query.profile){query = {profile:req.query.profile}}
		if (req.query.user){query = {profile:req.query.user}}
		if (req.query.vote){query = {profile:req.query.vote}}
		if (req.query.filter){query = JSON.parse(JSON.stringify(req.query.filter))}
		var model = await Content.find(query).limit(100).skip(skip).sort(sort).
		res.json(model);
	},
	//TODO: ASSOCIATIONS
	create: async function (req, res) {
		var Content = req.param('content');
		var ContentModel = req.param('contentModel');
		var bill = req.param('bill');
		var profile = req.param('profile');
		var committee = req.param('committee');
		var user = req.param('user');
		var vote = req.param('vote');
		var meansOfContact = req.param('meansOfContact');
		var model = {
			Content: Content,
			ContentModel: ContentModel,
			bill: bill,
			profile: profile,
			committee: committee,
			user: user,
			vote: vote,
		};
		var model = await Content.create(model);
		var Content = await Content.getOne(model.id);
		Content.publishCreate(model[0]);
		res.json(model);	
	},
};

