/**
 * SearchController
 * @description :: Server-side logic for searching
 */

module.exports = {

	getMemberActivity: function (req, res) {
		var filter = req.query.filter;
		var limit = req.query.limit;
		var skip = req.query.skip;

		Post.getSome(100,0,'createdAt Desc', {profile:filter})
		.then(function(postModel){
			postModel.map(function (obj) {
				obj.model = 'post';
			});

			var profileFilter = {};
			profileFilter.user = filter;
			profileFilter.profile = {'!': filter};

			Post.getSome(100,0,'createdAt Desc', profileFilter)
			.then(function(postProfileModel){
				postProfileModel.map(function (obj) {
					obj.model = 'post';
				});

				var combinedModels = postModel.concat(postProfileModel);
				VoteVote.getSome(100,0,'createdAt Desc', {user:filter})
				.then(function(voteModel){
					console.log(voteModel)
					voteModel.map(function (obj) {
						obj.model = 'vote';
					});

					var combinedCombinedModels = combinedModels.concat(voteModel);
					combinedCombinedModels.sort(function(a,b){return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);}); 
					res.json(combinedCombinedModels);

					//CommitteeMember.getSome(100,0,'createdAt Desc', {user:filter})
					//.then(function(commmitteeMemberModel){
						//commmitteeMemberModel.map(function (obj) {
							//obj.model = 'committeeMember';
						//});

						//new constituent -- new rep

						//var combinedCombinedCombinedModels = combinedCombinedModels.concat(commmitteeMemberModel);
						//combinedCombinedCombinedModels.sort(function(a,b){return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);}); 
						//res.json(combinedCombinedCombinedModels);
					//});

				});

			});

		});

	},

	getMemberFeed: function (req, res) {

		//get posts from committees member is a part of
		//get bills from committees
		//get votes from committees
		//get votes from activity
		//get posts from representives
		//get votevotes from representatives

		//get info from constituents?



	},

	getTrending: function(req,res){
		var filter = {};
		var startDate = new Date();
		var endDate = new Date();
		var limit = req.query.limit;
		var skip = req.query.skip;

		startDate.setMonth(startDate.getDay() - 7);
		filter.createdAt = { '>': startDate, '<': endDate };

		Post.getSome(100,0,'createdAt Desc', filter)
		.then(function(postModel){

			postModel.map(function (obj) {
				obj.model = 'post';
			});

			Vote.getSome(100,0,'createdAt Desc', filter)
			.then(function(voteModel){
				//console.log(voteModel);
				voteModel.map(function (obj) {
					obj.model = 'vote';
				});
				var combinedModels = postModel.concat(voteModel);
				combinedModels.sort(function(a,b) {return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);} ); 

				res.json(combinedModels);

			});

		});

	},


	search: function (req, res) {
		var searchQuery = req.param('searchQuery');
		sails.log(searchQuery);
		
		Committee.find()
		.where({
			//or: [
				title: {contains: searchQuery},
				//{urlTitle: {contains: searchQuery}},
				//{userId: {contains: searchQuery}}
			//]
		})
		.limit(25)
		.then(function(models) {
			var CommitteeModels = models;
			Committee.watch(req);
			Committee.subscribe(req, models);

			CommitteeModels.map(function (obj) {
				obj.model = 'committee';
			});


			User.find()
			.where({
				or: [
					{username: {contains: searchQuery}},
					{first_name: {contains: searchQuery}},
					{last_name: {contains: searchQuery}}
				]
			})
			.limit(25)
			.then(function(models) {
				models.map(function (obj) {
					obj.model = 'user';
				});
				var combinedModels = CommitteeModels.concat(models);

				User.watch(req);
				User.subscribe(req, models);

				Bill.find()
				.where({
					or: [
						{title: {contains: searchQuery}},
						{billContent: {contains: searchQuery}}
					]
				})
				.limit(25)
				.then(function(models) {
					models.map(function (obj) {
						obj.model = 'bill';
					});
					var superCombinedModels = combinedModels.concat(models);
					Bill.watch(req);
					Bill.subscribe(req, models);

					Vote.find()
					.where({
						//or: [
							title: {contains: searchQuery},
						//]
					})
					.limit(25)
					.then(function(models) {
						models.map(function (obj) {
							obj.model = 'vote';
						});
						var superSuperCombinedModels = superCombinedModels.concat(models);
						Vote.watch(req);
						Vote.subscribe(req, models);
						res.json(superSuperCombinedModels);
					})

				})
				.fail(function(err) {});	
			})
			.fail(function(err) {});			
		})
		.fail(function(err) {});
	}	

};