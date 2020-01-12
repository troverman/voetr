module.exports = {
	getOne: function(req, res) {
		Follower.getOne(req.param('id'))
		.spread(function(model) {
			Follower.subscribe(req, model);
			res.json(model);
		})
	},
	getFollowers: function(req, res) {
		var FollowedId = req.param('id');
		Follower.getFollowers(FollowedId)
		.spread(function(models) {
			Follower.watch(req);
			Follower.subscribe(req, models);
			res.json(models);
		})
	},
	getFollowing: function(req, res) {
		var FollowerId = req.param('id');
		Follower.getFollowing(FollowerId)
		.spread(function(models) {
			Follower.watch(req);
			Follower.subscribe(req, models);
			res.json(models);
		})
	},
	//TODO: ASSOCIATION
	create: async function (req, res) {
		var FollowedId = req.param('followed');
		var FollowerId = req.param('follower');
		var model = {
			followed: FollowedId,
			follower: FollowerId,
		};
		var newFollower = await Follower.create(model)
		var follower = await Follower.find({id:newFollower.id});
		Follower.publishCreate(follower[0]);
		res.json(follower[0]);
	},
};