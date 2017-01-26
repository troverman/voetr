var request = require('request');
var govTrack = require('govtrack-node');
var Q = require('q');
var _ = require('lodash');

var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};


function bills(){

	var model= {
		url: 'http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70',
		json: true,
	};

	request(model, function (error, response, body) {
    	if (!error) {
        	var billData = body.results;
        	for (i in billData){
        		console.log(billData[i]);

        		/*
				console.log(billData[i]);
        		sails.log(billData[i].bill_id);
        		sails.log(billData[i].bill_type);
        		sails.log(billData[i].chamber);
        		sails.log(billData[i].committee_ids);
        		sails.log(billData[i].congress);
				sails.log(billData[i].cosponsors_count);
        		sails.log(billData[i].enacted_as);
        		sails.log(billData[i].history);
				sails.log(billData[i].history.active);
        		sails.log(billData[i].history.awaiting_signature);
        		sails.log(billData[i].history.enacted);
				sails.log(billData[i].history.vetoed);
        		sails.log(billData[i].introduced_on);
        		sails.log(billData[i].last_action_at);
        		sails.log(billData[i].last_version_on);
        		sails.log(billData[i].last_vote_at);
				sails.log(billData[i].official_title);
				sails.log(billData[i].popular_title);
				sails.log(billData[i].related_bill_ids);
				sails.log(billData[i].short_title);
				sails.log(billData[i].sponsor);
				sails.log(billData[i].sponsor.first_name);
				sails.log(billData[i].sponsor.last_name);
				sails.log(billData[i].sponsor.title);
				sails.log(billData[i].sponsor_id);
				sails.log(billData[i].urls);
				sails.log(billData[i].urls.congress);
				*/

				var title = billData[i].official_title;
				var billContent = billData[i].bill_id + ' : ' + billData[i].official_title + ' : ' + billData[i].sponsor + ' : ' + billData[i].introduced_on + ' : ' + billData[i].urls.congress
				var model = {
					billContent: billContent,
					committee: 1,
					title: title,
					urlTitle: title.replace(/ /g,"-").toLowerCase(),
					user: 1
				};

				/*Bill.findOrCreate(model, model)
				.exec(function(err, bill) {
					if (err) {
						return console.log(err);
					}
					else {
						Bill.publishCreate(bill);
						console.log(bill);
					}
				});*/

        	}
    	}
	});
};

function recentBills(){
	console.log('RECENT BILLS')
	govTrack.findBill({sort: '-introduced_date', limit:2000}, function(err, res) {
		if (!err) {
			var bills = res.objects;
			for (x in bills){
				//maybe store the full html vs an api link
				var congress = bills[x].congress;
				var type = bills[x].bill_type_label.replace(/[,.]/g , '').toLowerCase();
				var number = bills[x].display_number.split(" ")[1];
				var fullLink = 'http://api.fdsys.gov/link?collection=bills&billtype='+type+'&billnum='+number+'&congress='+congress+'&link-type=html';
				(function(fullLink, bills,x) {
				request(fullLink, function (error, response, body) {
				if (body){
					if (body.trim().substring(0, 2)=="<!"){body = null;}
				}
				//console.log(bills[x])
				var title = bills[x].title_without_number;
				var billContent = bills[x].display_number;
				var displayNumber = bills[x].display_number;
				//console.log(fullLink);
				var model = {
					billContent: bills[x],
					fullLink: body,
					displayNumber: displayNumber,
					committee: 1,
					title: title,
					urlTitle: title.replace(/ /g,"-").toLowerCase(),
					displayId: bills[x].id,
					user: 1
				};
				//console.log(model)
				Bill.findOrCreate({displayNumber:displayNumber}, model)
				.exec(function(err, billModel) {
					if (!err) {
						Bill.publishCreate(billModel);
						(function(billModel) {
							govTrack.findVote({related_bill: billModel.displayId, limit:1000}, function(err, res) {
								if(!err && res.objects){
									var votes = res.objects;
									if (!err && votes.length > 0) {
										for(y in votes){
											var model = {
												result: votes[y].result,
												required: votes[y].required,
												type: votes[y].vote_type,
												plusCount: votes[y].total_plus,
												minusCount: votes[y].total_minus,
												otherCount: votes[y].total_other,
												title: votes[y].question,
												urlTitle: votes[y].question.replace(/ /g,"-").toLowerCase(),
												displayId: votes[y].id,
												bill: billModel.id,
												user: 1
											};
											Vote.findOrCreate({displayId:votes[y].id, title: votes[y].question}, model)
											.exec(function(err, voteModel) {
												console.log(voteModel)
												if (!err){
													Vote.publishCreate(voteModel);
													(function(voteModel) {
														govTrack.findVoteVoter({vote: voteModel.displayId, limit:1000}, function(err, res) {
															if(!err && res.objects){
																var voteVoters = res.objects;
																for(z in voteVoters){
																	var voteString = voteVoters[z].option.value;
																	(function(voteString) {
																		User.find()
																		.where({bioguide_id: voteVoters[z].person.bioguideid})
																		.then(function(userModel) {
																			var voteInteger = 0;
																			var user = userModel;
																			if(voteString == 'Yea' || voteString == 'Aye'){voteInteger = 1;}
																			if(voteString == 'Nay' || voteString == 'No'){voteInteger = -1;}
																			if(user[0]){user = userModel[0].id}
																			var model = {
																				voteInteger: voteInteger,
																				voteString: voteString,
																				vote: voteModel.id,
																				bill: billModel.id,
																				user: user
																			};
																			//console.log(model);
																			/*VoteVote.find({bill: billModel, vote:voteModel, user:userModel[0]})
																			.then(function(voteVoteModel) {
																				console.log('...')
																				if(voteVoteModel.length >0){console.log(voteVoteModel)}
																			});*/

																			VoteVote.findOrCreate({bill: billModel.id, vote:voteModel.id, user: user}, model)
																			.exec(function(err, voteVoteModel) {
																				if (!err) {
																					VoteVote.publishCreate(voteVoteModel);
																					//break into positive and negative..!
																					VoteVote.count()
																					.where({vote:voteModel.id})
																					.exec(function(err, voteCount) {
																						console.log(voteCount)
																						Vote.update({id: voteModel.id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
																						  if (err) {
																						    return;
																						  }
																						});
																					});
																				}
																			});
																		});
																	})(voteString)
																}
															}
														});
													})(voteModel);
												}
											});
										}
									}
								}
							});
						})(billModel);
					}
				});
				Bill.update({displayNumber: displayNumber}, model).then(function(){console.log('UPDATED THE BILL!')});
				});
				})(fullLink, bills, x);

			}
		}
	});
};

function legislators(){

	var url = "http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=c16a6c623ee54948bac2a010ea6fab70";
	request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {

				var congressData = body.results;

				for (var key in congressData) {

					var bioguide_id = congressData[key].bioguide_id;
					var birthday = congressData[key].birthday;
					var chamber = congressData[key].chamber
					var crp_id = congressData[key].crp_id;
					var district = congressData[key].district;
					var facebook_id = congressData[key].facebook_id;
					var fax = congressData[key].fax;
					var fec_ids = congressData[key].fec_ids;
					var first_name = congressData[key].first_name;
					var gender = congressData[key].gender;
					var govtrack_id = congressData[key].govtrack_id;
					var in_office = congressData[key].in_office;
					var last_name = congressData[key].last_name;
					var leadership_role = congressData[key].leadership_role;
					var middle_name = congressData[key].middle_name;
					var office = congressData[key].office;
					var party = congressData[key].party;
					var phone = congressData[key].phone;
					var state = congressData[key].state;
					var state_name = congressData[key].state_name;
					var term_end = congressData[key].term_end;
					var term_start = congressData[key].term_start;
					var thomas_id = congressData[key].thomas_id;
					var twitter_id = congressData[key].twitter_id;
					var website = congressData[key].website;

					var username = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.');
					var email = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.') + '@gmail.com';
					var socialAccounts = {};
					if (twitter_id != null){socialAccounts.twitter = {profileUrl: 'https://www.twitter.com/' + twitter_id}};
					if (facebook_id != null){socialAccounts.facebook = {profileUrl: 'https://www.facebook.com/' + facebook_id}};
					//console.log(bioguide_id)
					var avatarUrl = 'https://theunitedstates.io/images/congress/original/'+bioguide_id+'.jpg'
					var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg', 'images/bokeh.jpg', 'images/metro.jpg', 'images/brasil.jpg', 'images/natural.jpg']
					var randInt = Math.floor(Math.random() * (coverUrlArray.length));
					var coverUrl = coverUrlArray[randInt];
					var title ='';
					if (chamber == 'senate'){title = 'US Senator'}
					if (chamber == 'house'){title = 'US Representative'}
					var model = {
						username: username,
						email: email,
						first_name: first_name,
						last_name: last_name,
						socialAccounts: socialAccounts,
						leadership_role:leadership_role,
						phone: phone,
						party: party,
						state: state_name,
						title: title,
						district: district,
						term_end: term_end,
						term_start: term_start,
						bioguide_id: bioguide_id,
						avatarUrl: avatarUrl,
						coverUrl : coverUrl
					};

					User.findOrCreate({bioguide_id: bioguide_id}, model)
					.exec(function(err, user) {
						if (err) {
							return console.log(err);
						}
						else {
							User.publishCreate(user);
						}
					});
					User.update({bioguide_id: bioguide_id}, model).then(function(){console.log('updated')});
				}
		    }
	});

};

function stateLegislators(){

	var url = "http://openstates.org/api/v1//legislators/?active=true&apikey=c16a6c623ee54948bac2a010ea6fab70";
	request({
		    url: url,
		    json: true
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				var stateData = body;
				for (x in stateData) {
					var first_name = stateData[x].first_name;
					var last_name = stateData[x].last_name;
					var photo_url;
					if(stateData[x].photo_url){photo_url = stateData[x].photo_url/*.replace(/^http:\/\//i, 'https://')*/}
					if(!stateData[x].photo_url){photo_url = 'images/avatar.png'}
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
					.replace('..', '.')
					.replace(/'/g, '.')

					var email =  stateData[x].email;
					if( typeof email === 'undefined' || email === null || email===''){
						email = trim_username + '@gmail.com';
					}
					
					var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg', 'images/natural.jpg']
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
						if (err) {console.log(err);}
						else {
							console.log('created state');
							User.publishCreate(user);
						}
					});
					User.update({leg_id: leg_id}, model).then(function(err, user){console.log('updated state')})
				}
		    }
	});

};

function openStates(){

	var OpenStates = require('openstates');
	var openstates = new OpenStates('c16a6c623ee54948bac2a010ea6fab70');
	openstates.billDetail('nc', '2013', 'HB 589', function(err, json) {
	  if (err) throw err;
	  console.log(json);
	});

}

function stateBills(state){


	var url = "http://openstates.org/api/v1/bills/?state="+state+"&apikey=c16a6c623ee54948bac2a010ea6fab70";
	request({
		    url: url,
		    json: true
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				var stateBillData = body;
				for (x in stateBillData) {
					var stateBillId = stateBillData[x].id
					if (stateBillId){
						var url = "http://openstates.org/api/v1/bills/"+stateBillId+"?apikey=c16a6c623ee54948bac2a010ea6fab70";
						request({
							    url: url,
							    json: true
							}, function (error, response, body) {
								if (!error && response.statusCode === 200) {
									var title = body.title
									var urlTitle = body.title.replace(/ /g,"-").toLowerCase();
									var model = {
										billContent: body,
										displayNumber: body.id,
										committee: 1,
										title: title,
										urlTitle: urlTitle,
										user: 1
									};
									var votes = body.votes;
									for (x in votes){
										console.log(votes[x].motion);
										var model = {
											result: votes[x].passed,
											title: votes[x].motion,
											user: 1
										}

										/*(function(x, votes) {
											Bill.findOrCreate({displayNumber:body.id}, model).exec(function(err, bill){
												if (!err) {
													if (typeof votes != "undefined"){

														var yesVotesArray = _.map(votes[x].yes_votes, function(element) { 
														     return _.extend({}, element, {vote: 1, voteString: 'Yea'});
														});
														var noVotesArray = _.map(votes[x].no_votes, function(element) { 
														     return _.extend({}, element, {vote: -1, voteString: 'Nay'});
														});
														var otherVotesArray = _.map(votes[x].other_votes, function(element) { 
														     return _.extend({}, element, {vote: 0, voteString: 'No Vote'});
														});

														var votesArray = [];
														var votesArray = votesArray.concat(yesVotesArray, noVotesArray, otherVotesArray);
														//console.log(votesArray)
														for(x in votesArray){
															var leg_id = votesArray[x].leg_id;
															if (leg_id){
																(function(x) {
																	User.find({leg_id: leg_id}).then(function(user){
																		//console.log(x)
																		if (typeof user[0] != "undefined"){
																			//console.log(user);
																			var model = {
																				vote: votesArray[x].vote,
																				voteString: votesArray[x].voteString,
																				bill: bill.id,
																				user: user[0].id
																			}
																			//console.log(model);{vote: -1, voteString: 'Nay'}
																			Vote.findOrCreate({bill:bill.id, user:user[0].id}, model)
																			.exec(function(err, vote) {
																				if (err) {
																					return console.log(err);
																				}
																				else {

																					Vote.publishCreate(vote);
																					console.log(vote);

																					Vote.count()
																					.where({bill: bill.id})
																					.exec(function(err, voteCount) {
																						console.log(voteCount)
																						Bill.update({id: bill.id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
																						  if (err) {
																						    return;
																						  }
																						});
																					});
																					
																				}
																			});
																		}

																	});
																})(x)
															}
														}
													}
												}
											});
										})(x, votes)*/

									}
								}

						});
					}

				}

		    }
	});

};

function govTracker(){

	govTrack.findVote({sort: '-created', limit:1000}, function(err, res) {
		for (x in res.objects){
			if (res.objects[x].related_bill != null){
				console.log(res.objects[x].related_bill)// --> cre8
			}
		}
	});

};

function committees(){

var url = "http://congress.api.sunlightfoundation.com/committees?per_page=all&apikey=c16a6c623ee54948bac2a010ea6fab70"

	request({
			    url: url,
			    json: true
			}, function (error, response, body) {
		    	if (!error) {
		        	var committeeData = body.results;
		        	for (x in committeeData){

						var title = committeeData[x].name;
						var urlTitle = title.replace(/ /g,"-").toLowerCase();
						var chamber = committeeData[x].chamber;
						var committee_id = committeeData[x].committee_id;
						var subcommittee = committeeData[x].subcommittee;
						var parent_committee_id = committeeData[x].parent_committee_id;

						var model = {
							title: title,
							urlTitle: urlTitle,
							chamber: chamber,
							committee_id: committee_id,
							subcommittee: subcommittee,
							parent_committee_id: parent_committee_id
						};

						Committee.findOrCreate({urlTitle: urlTitle}, model).exec(function createCB(err, created){
							if(!err){console.log(created);}
						});
		        	}
		    	}
		});

};

function proPublica(){

	//incrementally add all roll call votes for each session.... 
	//y u do this govTrack.. 
	//just use sunlight to replace govTrack
	for(var i; i++; i>10000){

		var model= {
			//url: 'https://api.propublica.org/congress/v1/114/house/bills/introduced.json',
			url: 'https://api.propublica.org/congress/v1/114/senate/sessions/2/votes/'+i+'.json',
			//url: 'https://api.propublica.org/congress/v1/house/votes/2016/1.json',
			json: true,
			headers: {'X-API-Key': 'hkxQrlrF0ba6dZdSxJMIC4B60JxKMtmm8GR5YuRx'}
		};

		request(model, function (error, response, body) {
			console.log(body.results.votes)
			//console.log(body.results.votes.vote.bill)
			//console.log(body.results.votes.vote.positions)
			for (x in body.results.votes.vote.positions){
				//body.results.votes.vote.positions[x].member_id
				console.log(body.results.votes.vote.positions[x].member_id)
				//User.find()
				//.where({bioguide_id: body.results.votes.vote.positions[x].member_id})
				//.then(function(userModel) {
				//	console.log(userModel)
				//});
			}
		});
	}
};

function getLegislators(lat, lng){

	var lat = req.param('lat');
	var lng = req.param('lng');
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
				//res.json(representatives)
	    	});
    	});
	}).catch(function(err) {console.log(err)});	

};

module.exports.intervalService = function(){

	for (x in Object.keys(states)){
		//console.log(Object.keys(states)[x])
		dataService.stateBills(Object.keys(states)[x],1,88);
		//if(x<=7){
		//if( (x >= 0) && (x < 5) ){
		//if(x >= 40){
			//console.log(states[x])
			//stateBills(states[x])
		//}
	}


	//proPublica();
	//bills()
	//openStates();
	//committees();
	//recentBills();

	//setInterval(dataService.federalBills.bind(null, 1, 20), 14400000);
	//dataService.federalBills(1, 1000);
	//dataService.federalBills(999, 1999);
	//dataService.federalVotes();
	//dataService.federalCommittees();
	//dataService.stateCommittees();

	//legislators();
	//stateLegislators();
    //setInterval(recentBills, 86400000);
    //setInterval(legislators, 86400000);

    //multithreading...
    /*var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

	//console.log('global '+numCPUs);

	// create the server 
	if (cluster.isMaster) {
	    for (var i = 0; i < numCPUs; i++) {
        	console.log('this is for CPU '+i);
	        cluster.fork();
	    }
	}
	else {
	    console.log('This is a worker!');
		recentBills();
	}*/ 

};