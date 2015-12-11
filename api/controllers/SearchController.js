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
			Committee.watch(req);
			Committee.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	}	

};