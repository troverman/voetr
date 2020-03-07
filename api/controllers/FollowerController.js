module.exports = {
	//TODO: ASSOCIATION .. 
	get: function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		var filter = req.query.filter || {};
		var models = await Follower.find(filter).limit(limit).skip(skip).sort(sort);
		res.json(models);
	},
	//TODO: ASSOCIATION
	create: async function (req, res) {
		var FollowedId = req.param('followed');
		var FollowerId = req.param('follower');
		var model = {followed: FollowedId, follower: FollowerId,};
		var newFollower = await Follower.create(model)
		var follower = await Follower.find({id:newFollower.id});
		Follower.publishCreate(follower[0]);
		res.json(follower[0]);
	},
};