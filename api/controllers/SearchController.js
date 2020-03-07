module.exports = {
	getMemberActivity: async function (req, res) {

		var filter = req.query.filter;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var startDate = new Date();
		var endDate = new Date();

		//startDate.setMonth(startDate.getDay() - 7);
		//var createdAt = { '>': startDate, '<': endDate };
		//limit date -
		//-- at each callback interval
		//limit - skip isnt the best on multiple models..
		//gotta keep these models in date order...

		var postModel = await Post.getSome(limit, skip, 'createdAt Desc', {profile:filter})
		postModel.map(function (obj) {obj.model = 'post';});
		var profileFilter = {};
		profileFilter.user = filter;
		profileFilter.profile = {'!': filter};

		var postProfileModel = await Post.getSome(limit, skip, 'createdAt Desc', profileFilter);
		postProfileModel.map(function (obj) {obj.model = 'post';});
		var combinedModels = postModel.concat(postProfileModel);
		Post.watch(req);
		Post.subscribe(req, combinedModels);

		var voteModel = await VoteVote.getSome(limit, skip, 'createdAt Desc', {user:filter});
		voteModel.map(function (obj) {obj.model = 'vote';});
		VoteVote.watch(req);
		VoteVote.subscribe(req, voteModel);

		var combinedCombinedModels = combinedModels.concat(voteModel);
		var voteOccurances = combinedCombinedModels.filter(function(obj){return obj.model === 'vote';}).length;
		console.log(voteOccurances);
		var postOccurances = combinedCombinedModels.filter(function(obj){return obj.model === 'post';}).length;
		console.log(postOccurances);

		combinedCombinedModels.sort(function(a,b){return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);}); 
		res.json(combinedCombinedModels);
	},
	getTrending: async function(req,res){

		var filter = {};
		var startDate = new Date();
		var endDate = new Date();
		var limit = req.query.limit;
		var skip = req.query.skip;
		startDate.setMonth(startDate.getDay() - 7);
		filter.createdAt = { '>': startDate, '<': endDate };
		var postModel = await Post.getSome(50,0,'createdAt Desc', filter)
		postModel.map(function (obj) {obj.model = 'post';});
		var voteModel = await Vote.getSome(50,0,'createdAt Desc', filter)
		voteModel.map(function (obj) {obj.model = 'vote';});
		var combinedModels = postModel.concat(voteModel);
		combinedModels.sort(function(a,b) {return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);} ); 
		res.json(combinedModels);
	},
	search: async function (req, res) {

		var searchQuery = req.param('searchQuery');
		var models = await Committee.find().where({title: {contains: searchQuery}}).limit(10)
		var CommitteeModels = models;
		Committee.watch(req);
		Committee.subscribe(req, models);
		CommitteeModels.map(function (obj) {obj.model = 'committee';});

		var models = await User.find().where({or: [{username: {contains: searchQuery}}, {first_name: {contains: searchQuery}}, {last_name: {contains: searchQuery}}]}).limit(10)
		models.map(function (obj) {obj.model = 'user';});
		var combinedModels = CommitteeModels.concat(models);
		User.watch(req);
		User.subscribe(req, models);

		var models = await Bill.find().where({or: [{title: {contains: searchQuery}}, {billContent: {contains: searchQuery}}]}).limit(10)
		models.map(function (obj) {obj.model = 'bill';});	
		var superCombinedModels = combinedModels.concat(models);
		Bill.watch(req);
		Bill.subscribe(req, models);

		var models = await Vote.find().where({title: {contains: searchQuery}}).limit(10)
		models.map(function (obj) {obj.model = 'vote';});
		var superSuperCombinedModels = superCombinedModels.concat(models);
		Vote.watch(req);
		Vote.subscribe(req, models);
		res.json(superSuperCombinedModels);
	}	
};