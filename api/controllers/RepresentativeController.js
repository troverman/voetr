var request = require('request');
var rp = require('request-promise');
var Q = require('q');
module.exports = {
	getOne: function(req, res) {
		Representative.getOne(req.param('id'))
		.spread(function(model) {
			Representative.subscribe(req, model);
			res.json(model);
		});
	},
	getConstituents: function(req, res) {
		var representative = req.param('id');
		Representative.getConstituents(representative)
		.spread(function(models) {
			Representative.watch(req);
			Representative.subscribe(req, models);
			res.json(models);
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
	getByLocationNEW: function(lat, lng){
		var model = {
			url: 'https://www.googleapis.com/civicinfo/v2/representatives/?key=AIzaSyDuNNenJANprqe8vwdk_v6wuN38EEUkJPs&address='+req.query.lat+','+req.query.lng+'&roles=legislatorlowerbody&roles=legislatorupperbody',
			json: true,
		};
		var modelArray = [];
		request(model, function (error, response, body) {
			console.log(body);
			if(!error){
				console.log(body.officials);
				for (x in body.officials){
					//ID IS ALSO IN PIC URL..
					var first_name = body.officials[x].name.split(' ')[0];
					var last_name = body.officials[x].name.split(' ').slice(-1)[0];
					if (last_name.endsWith('.')){last_name = body.officials[x].name.split(' ')[body.officials[x].name.split(' ').length - 2] + ' ' + body.officials[x].name.split(' ').slice(-1)[0]}
					var model = {first_name:first_name, last_name:last_name};
					console.log(first_name, last_name);
					modelArray.push(model)
				}
				Legislator.find(modelArray).then(function(models){
					console.log(models);
					res.json(models)
				});
			}
		});
	},
	getByLocation: async function(req, res) {
		//TODO: get info from address + loggedIn userId
		var lat = req.query.lat;
		var lng = req.query.lng;
		var stateModel= {
			url: 'http://openstates.org/api/v1/legislators/geo/?lat='+lat+'&long='+lng+'&active=true&apikey=f6907ad0-1af4-4656-add7-657931b439ef',
			json: true
		};
		var federalModel = {
			url: 'http://congress.api.sunlightfoundation.com/legislators/locate?latitude='+lat+'&longitude='+lng+'&per_page=all&apikey=hkxQrlrF0ba6dZdSxJMIC4B60JxKMtmm8GR5YuRx',
			json: true
		};
		var stateRepresentatives = await rp(stateModel);
		var federalRepresentativesRequest = await rp(federalModel);
		var federalRepresentatives = federalRepresentativesRequest.results;
		var stateRepresentatives = representatives[1];
		var bioguide_id = federalRepresentatives.map(function(obj){return obj.bioguide_id});
		var leg_id = stateRepresentatives.map(function(obj){return obj.leg_id});
		var federalRepresentatives = await User.find({bioguide_id:bioguide_id});
		var federalRepresentativesModel = federalRepresentatives;
		representatives.concat(federalRepresentatives);
		var stateRepresentatives = await User.find({leg_id:leg_id});
		var representatives = federalRepresentativesModel.concat(stateRepresentatives)
		res.json(representatives)    
	},

	create: async function (req, res) {
		var representative = req.param('representative');
		var constituent = req.param('constituent');
		var committee = req.param('committee');
		var model = {
			representative: representative,
			constituent: constituent,
			committee: committee,
		};
		var model = await Representative.create(model)
		var representative = await Representative.find({id:representative.id});
		Representative.publishCreate(representative[0]);
		res.json(representative[0]);
	},	
};

