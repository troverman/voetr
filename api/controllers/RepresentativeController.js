/**
 * RepresentativeController
 * @description :: Server-side logic for managing Representatives
 */

var request = require('request');
var rp = require('request-promise');
var Q = require('q');

module.exports = {

	getOne: function(req, res) {
		Representative.getOne(req.param('id'))
		.spread(function(model) {
			Representative.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getConstituents: function(req, res) {
		var representative = req.param('id');
		Representative.getConstituents(representative)
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getConstituentCount: function(req, res) {
		Representative.count()
		.where({representative:req.param('id')})
		.exec(function(err, constituentCount) {
			if (err) {return console.log(err);}
			else{res.json({ constituentCount: constituentCount });}
		});
	},

	getRepresentatives: function(req, res) {
		var constituent = req.param('id');
		Representative.getRepresentatives(constituent)
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getRepresentativeCount: function(req, res) {
		Representative.count()
		.where({constituent:req.param('id')})
		.exec(function(err, representativeCount) {
			if (err) {return console.log(err);}
			else{res.json({ representativeCount: representativeCount });}
		});
	},

	getByLocation: function(req, res) {
		//TODO: get info from address + loggedIn userId
		var lat = req.query.lat;
		var lng = req.query.lng;
		var stateModel= {
			url: 'http://openstates.org/api/v1/legislators/geo/?lat='+lat+'&long='+lng+'&active=true&apikey=c16a6c623ee54948bac2a010ea6fab70',
			json: true
		};
		var federalModel = {
			url: 'http://congress.api.sunlightfoundation.com/legislators/locate?latitude='+lat+'&longitude='+lng+'&per_page=all&apikey=c16a6c623ee54948bac2a010ea6fab70',
			json: true
		};
		rp(stateModel).then(function(stateRepresentatives){
			return [rp(federalModel), stateRepresentatives];
		}).spread(function(federalRepresentatives, stateRepresentatives) {
			return [federalRepresentatives.results, stateRepresentatives];
		}).then(function(representatives){
			var federalRepresentatives = representatives[0];
			var stateRepresentatives = representatives[1];
			var bioguide_id = federalRepresentatives.map(function(obj){return obj.bioguide_id});
			var leg_id = stateRepresentatives.map(function(obj){return obj.leg_id});
			User.find({bioguide_id:bioguide_id}).then(function(federalRepresentatives){
				var federalRepresentativesModel = federalRepresentatives;
				representatives.concat(federalRepresentatives);
				User.find({leg_id:leg_id}).then(function(stateRepresentatives){
					var representatives = federalRepresentativesModel.concat(stateRepresentatives)
					res.json(representatives)
		    	});
	    	});
		})
		.catch(function(err) {
			console.log(err);
		});	
	},

	create: function (req, res) {

		var representative = req.param('representative');
		var constituent = req.param('constituent');
		var committee = req.param('committee');

		var model = {
			representative: representative,
			constituent: constituent,
			committee: committee,
		};

		Representative.create(model)
		.exec(function(err, representative) {
			if (err) {
				return console.log(err);
			}
			else {
				Representative.getOne(representative.id).then(function(representative){
					Representative.publishCreate(representative[0]);
					res.json(representative[0]);
				});
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		Representative.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			Representative.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				Representative.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

