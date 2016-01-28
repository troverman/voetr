/**
 * SearchController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

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
		.then(function(models) {

			var CommitteeModels = models;
			Committee.watch(req);
			Committee.subscribe(req, models);

			User.find()
			.where({
				or: [
				{username: {contains: searchQuery}},
				{first_name: {contains: searchQuery}},
				{last_name: {contains: searchQuery}}
			]
			})
			.then(function(models) {
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
				.then(function(models) {
					var superCombinedModels = combinedModels.concat(models);

					Bill.watch(req);
					Bill.subscribe(req, models);
					res.json(superCombinedModels);

				})
				.fail(function(err) {});	
			})
			.fail(function(err) {});			
		})
		.fail(function(err) {});
	}	

};