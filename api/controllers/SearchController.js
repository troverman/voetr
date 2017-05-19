/**
 * SearchController
 * @description :: Server-side logic for searching
 */

module.exports = {

	getMemberActivity: function (req, res) {
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

		Post.getSome(limit, skip, 'createdAt Desc', {profile:filter})
		.then(function(postModel){
			postModel.map(function (obj) {
				obj.model = 'post';
			});

			//limit - postModel.length

			var profileFilter = {};
			profileFilter.user = filter;
			profileFilter.profile = {'!': filter};

			Post.getSome(limit, skip, 'createdAt Desc', profileFilter)
			.then(function(postProfileModel){
				postProfileModel.map(function (obj) {
					obj.model = 'post';
				});

				var combinedModels = postModel.concat(postProfileModel);

				Post.watch(req);
				Post.subscribe(req, combinedModels);

				VoteVote.getSome(limit, skip, 'createdAt Desc', {user:filter})
				.then(function(voteModel){
					//console.log(voteModel)
					voteModel.map(function (obj) {
						obj.model = 'vote';
					});

					VoteVote.watch(req);
					VoteVote.subscribe(req, voteModel);

					var combinedCombinedModels = combinedModels.concat(voteModel);

					var voteOccurances = combinedCombinedModels.filter(function(obj){
					    return obj.model === 'vote';
					}).length;
					console.log(voteOccurances);

					var postOccurances = combinedCombinedModels.filter(function(obj){
					    return obj.model === 'post';
					}).length;
					console.log(postOccurances);

					//--> use a smart return to get 3 skip values. :)
					//problem.. 26th value in diff model of limit, skip is not soreted by date. 
					//solution use date filters 

					//--roder by date filters vs model..????


					combinedCombinedModels.sort(function(a,b){return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);}); 
					res.json(combinedCombinedModels);


					//>:(
					//res.json(combinedCombinedModels.slice(0, limit));

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

		Post.getSome(50,0,'createdAt Desc', filter)
		.then(function(postModel){

			postModel.map(function (obj) {
				obj.model = 'post';
			});

			Vote.getSome(50,0,'createdAt Desc', filter)
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