/**
 * SearchController
 * @description :: Server-side logic for searching
 */

module.exports = {

	activity: function (req, res) {
		var searchQuery = req.param('searchQuery');

		
	},

	getTrending: function(req,res){
		var filter = {};
		var startDate = new Date();
		startDate.setMonth(startDate.getDay() - 7);
		var endDate = new Date();

		filter.createdAt = { '>': startDate, '<': endDate };

		var limit = req.query.limit;
		var skip = req.query.skip;
		
		Post.getSome(100,0,'createdAt Desc', startDate, endDate)
		.then(function(postModel){

			postModel.map(function (obj) {
				obj.model = 'post';
			});

			Vote.getSome(100,0,'createdAt Desc', filter)
			.then(function(voteModel){
				console.log(voteModel);

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