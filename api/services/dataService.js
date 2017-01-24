var request = require('request');
var openCongressApiKey = 'c16a6c623ee54948bac2a010ea6fab70';
module.exports = {

	federalBills: function(pageCount){

		var pageCount = pageCount;
		for (var page = 1; page < pageCount; page++){
			var model = {
				url: 'https://congress.api.sunlightfoundation.com/bills?&per_page=1&page='+page+'&apikey=' + openCongressApiKey,
				json: true,
			};
			request(model, function (error, response, body) {
				if (!error) {
					var billData;
					if (body.results[0]){billData = body.results[0]}
					var congress = billData.congress;
					var type = billData.bill_type;
					var number = billData.bill_id.replace(type, "").split("-")[0]
					var fullLink = 'https://api.fdsys.gov/link?collection=bills&billtype='+type+'&billnum='+number+'&congress='+congress+'&link-type=html';

					var billId = billData.bill_id;
					var title = billData.short_title;
					var urlTitle = '';
					if (title){urlTitle = title.replace(/ /g,"-").toLowerCase()}

					var sponsor = billData.sponsor;

					request(fullLink, function (error, response, body) {
						if (body){
							if (body.trim().substring(0, 2)=="<!"){body = null;}
						}
						console.log(body)
						var model = {
							title: title,
							urlTitle: urlTitle,
							billContent: billData,
							fullLink: body,
							billId: billId,
							committee: 1,
							user: 1 //sponsor
						};
						//Bill.findOrCreate({bill_id:bill_id}, model)
						//.exec(function(err, billModel) {
						//});
						//Bill.update({bill_id: bill_id}, model).then(function(){console.log('UPDATED THE BILL!')});
					});
	        	}
	        });
		}

	},

	federalLegislators: function(){
	},

	federalCommittees: function(){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/committees?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var committeeData = body.results;
				for (x in committeeData){

					//console.log(committeeData[x]);

					var committee_id = committeeData[x].committee_id;
					var name = committeeData[x].name;
					var urlTitle = name.toLowerCase().replace(/ /g,"-");
					var chamber = committeeData[x].chamber;
					var parent_committee_id = committeeData[x].parent_committee_id;
					var subcommittee = committeeData[x].subcommittee;

					var model = {
						committee_id: committee_id,
						title: name,
						urlTitle: urlTitle,
						chamber: chamber,
						parent: parent_committee_id,
						user: 1,
					};

					Committee.findOrCreate({committee_id: committee_id},model).exec(function createCB(err, created){
						console.log('created state committee')
					})
					Committee.update({committee_id: committee_id}, model).then(function(){console.log('updated state committee')})

				}
        	}
        });
	},

	federalVotes: function(bill){

		var model = {
			url: 'https://congress.api.sunlightfoundation.com/votes?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var voteData = body.results;
				for (x in voteData){
					console.log(voteData[x]);
					var billId = voteData[x].bill_id;
					var question = voteData[x].question;
					var url = voteData[x].url;
				}
        	}
        });

	},

	federalVoteVotes: function(vote){

		var model = {
			//url: 'http://congress.api.sunlightfoundation.com/votes?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		
        	}
        });
	},

	stateBills: function(state){

		var model = {
			url: 'http://openstates.org/api/v1/bills/?state=' + state + '&apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var billData = body;
			}
        });

	},

	stateCommittees: function(state){
		var model = {
			url: 'https://openstates.org/api/v1//committees/?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				var committeeData = body;
				for (x in committeeData) {

					//console.log(committeeData[x]);

					var id = committeeData[x].id;
					var state = committeeData[x].state;
					var committee = committeeData[x].committee;
					var urlTitle = committee.toLowerCase().replace(/ /g,"-");
					var chamber = committeeData[x].chamber;
					var parent_id = committeeData[x].parent_id;
					var subcommittee = committeeData[x].parent_id;

					//var parent = chamber --> each state house, senate..

					var model = {
						committee_id: id,
						state: state,
						title: committee,
						urlTitle: urlTitle,
						chamber: chamber,
						parent: parent_id,
						//subcommittee: subcommittee,
						user: 1,
					};

					Committee.findOrCreate({committee_id: id},model).exec(function createCB(err, created){
						console.log('created state committee')
					});
					Committee.update({committee_id: id}, model).then(function(){console.log('updated state committee')});

				}
			}
		});

	},

	stateLegislators: function(){
		var model = {
			url: 'http://openstates.org/api/v1//legislators/?active=true&apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				var stateData = body;
				for (x in stateData) {
					var first_name = stateData[x].first_name;
					var last_name = stateData[x].last_name;
					var photo_url = stateData[x].photo_url;
					var offices = stateData[x].offices;
					var district = stateData[x].district;
					var chamber = stateData[x].chamber;
					var fax = offices.map(function(obj){return obj.fax});
					var phone = offices.map(function(obj){return obj.phone});
					var address = offices.map(function(obj){return obj.address});
					var title = '';
					if (chamber == 'lower'){title = 'State Representative'}
					if (chamber == 'upper'){title = 'State Senator'}
					var state = states[stateData[x].state.toUpperCase()];
					var party = stateData[x].party;
					var leg_id = stateData[x].leg_id;

					var trim_first_name = first_name
					.trim()
					.replace(/\s+/g, '.')
					.replace(/"/g,'')
					.replace(/,/g, '')
					.replace(/\\/g, '')

					var trim_last_name = last_name
					.trim()
					.replace(/\s+/g, '.')
					.replace(/"/g,'')
					.replace(/,/g, '')
					.replace(/\\/g, '');

					var username = trim_first_name + '.' + trim_last_name;
					
					var trim_username = username
					.replace(/[()]/g, '')
					.replace('/../g', '.')

					var email =  stateData[x].email;
					if( typeof email === 'undefined' || email === null || typeof email === 'string' ){
						email = trim_username + '@gmail.com';
					}

					var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg']
					var randInt = Math.floor(Math.random() * (coverUrlArray.length));
					var coverUrl = coverUrlArray[randInt];

					var model = {
						username: trim_username,
						email: email,
						first_name: first_name,
						last_name: last_name,
						title: title,
						district: district,
						address: address,
						phone: phone,
						fax: fax,
						leg_id: leg_id,
						party: party,
						avatarUrl: photo_url,
						coverUrl : coverUrl,
						state : state
					};

					User.findOrCreate({leg_id: leg_id}, model)
					.exec(function(err, user) {
						if (err) {
							return console.log(err);
						}
						else {
							User.publishCreate(user);
						}
					});
					User.update({leg_id: leg_id}, model).then(function(){console.log('updated state')})
				}
		    }
		});
	},

	stateVotes: function(state, bill){
	},

	stateVoteVotes: function(state, vote){
	}
}