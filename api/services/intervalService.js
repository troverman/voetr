var request = require('request');
var govTrack = require('govtrack-node');
var Q = require('q');

function bills(){

	var url = "http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70"

	request({
			    url: url,
			    json: true
			}, function (error, response, body) {

				//sails.log(body);

		    	if (!error) {

		        	var billData = body.results;
		        	for (i in billData){

		        		/*
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
						console.log(billData[i].bill_id);
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

/*function latestBills(){
	govTrack.findBill({sort: '-introduced_date', limit:1000}, function(err, res) {
		if (!err) {
			for (x in res.objects){
				console.log(res.objects[x])
			}
		}
	});
};*/


function recentBills(){
	
	/*
	Q = require('q');
	function getBills(newDisplayNumber) {
		return Q.when()
		.then(function () {
			var deferred = Q.defer();
			return deferred.resolve(
				Bill.find()
				.where({displayNumber: newDisplayNumber})
				.then(function(billModel){
					//console.log(billModel[0].id);
					return billModel[0].id;
				})
			);
		});
	};
	*/
	//console.log(displayNumber)
	//q resolve bill to get bill id
	//var yo = getBills(displayNumber);
	//var deferred = Q.defer()
	//var ok = deferred.resolve(Bill.find({displayNumber:displayNumber})
	//.then(function(models){
	//	return models.map(function(model){ 
	//		return model.id 
	//	}) 
	//}));
	//console.log(ok)

	govTrack.findBill({sort: '-introduced_date', limit:1000}, function(err, res) {
		if (!err) {
			for (x in res.objects){
				console.log(res.objects[x])
				var title = res.objects[x].title_without_number;
				var billContent = res.objects[x].display_number;
				var displayNumber = res.objects[x].display_number;
				sails.log(displayNumber)
				var model = {
					billContent: billContent,
					displayNumber: displayNumber,
					committee: 1,
					title: title,
					user: 1
				};
				Bill.findOrCreate({displayNumber:displayNumber}, model)
				.exec(function(err, bill) {
					if (err) {
						return console.log(err);
					}
					else {
						//Bill.publishCreate(bill);
						//console.log(bill);
					}
				});
				(function(displayNumber) {
					govTrack.findVote({related_bill: res.objects[x].id, limit:1000}, function(err, res) {
						Bill.find()
						.where({displayNumber: displayNumber})
						.then(function(billModel){
							var billModel = billModel;
							if (!err && res.objects.length > 0) {
								for(x in res.objects){
									(function(billModel) {
										govTrack.findVoteVoter({vote: res.objects[x].id}, function(err, res) {
											if(!err && res.objects){
												for(x in res.objects){
													//if(typeof(billModel) != "undefined"){console.log('outside:'+x+':'+billModel[0].id)}
													User.find()
													.where({bioguide_id: res.objects[x].person.bioguideid})
													.then(function(userModel) {
														if(typeof(billModel) != "undefined" && typeof(userModel != "undefined")){
															//console.log('inside:'+x+':'+billModel[0].id)
															//console.log('bill:'+billModel[0].id);
															//console.log('user:'+userModel[0].id);
															//console.log('vote:'+res.objects[x].option.value);
															var vote = 0
															if (res.objects[x].option.value == 'Yea' || res.objects[x].option.value == 'Aye'){
																vote = 1;
															}
															if(res.objects[x].option.value == 'Nay'){
																vote = -1;
															}
															var model = {
																vote: vote,
																voteString: res.objects[x].option.value,
																bill: billModel[0].id,
																user: userModel[0].id
															};
															Vote.findOrCreate([{bill:billModel[0].id},{user:userModel[0].id}], model)
															.exec(function(err, vote) {
																if (err) {
																	return console.log(err);
																}
																else {
																	Vote.count()
																	.where({bill: billModel[0].id})
																	.exec(function(err, voteCount) {
																		console.log(voteCount)
																		Bill.update({id: billModel[0].id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
																		  if (err) {
																		    return;
																		  }
																		});
																	});
																	Vote.publishCreate(vote);
																	console.log(vote);
																}
															});
														}
													});						
												}
											}
										});
									})(billModel)
								}
							}
						});
					})	
				})(displayNumber);
			}
		}
	});
};


function recentVotes(){

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
					var crp_id = congressData[key].crp_id;
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
					var title = congressData[key].title;
					var twitter_id = congressData[key].twitter_id;
					var website = congressData[key].website;

					var username = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.');
					var email = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.') + '@gmail.com';
					var socialMedia = {
						twitter: twitter_id,
						facebook: facebook_id
					};

					console.log(first_name + last_name + state + fax)

					console.log(bioguide_id)
					var avatarUrl = 'https://theunitedstates.io/images/congress/original/'+bioguide_id+'.jpg'
					var model = {
						username: username,
						email: email,
						first_name: first_name,
						last_name: last_name,
						socialMedia: socialMedia,
						leadership_role:leadership_role,
						phone: phone,
						party: party,
						term_end: term_end,
						term_start: term_start,
						bioguide_id: bioguide_id,
						avatarUrl: avatarUrl
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
					User.update({bioguide_id: bioguide_id}, model);
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
					var photo_url = stateData[x].photo_url;
					var offices = stateData[x].offices;
					var state = stateData[x].state;
					var party = stateData[x].party;
					var leg_id = stateData[x].leg_id;

					//console.log(offices[0].fax)

					var username = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.');
					var email =  stateData[x].email;

					var model = {
						username: username,
						email: email,
						first_name: first_name,
						last_name: last_name,

						//phone: offices[0].phone,
						//fax: offices[0].fax,

						leg_id: leg_id,
						party: party,
						avatarUrl: photo_url,
						state : state
					};

					console.log(model);

					/*User.findOrCreate({leg_id: leg_id}, model)
					.exec(function(err, user) {
						if (err) {
							return console.log(err);
						}
						else {
							User.publishCreate(user);
						}
					});*/
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
				//console.log(stateBillData.length)
				for (x in stateBillData) {
					//console.log(stateBillData[x].id);
					//get full data -- including votes -- sweet

					//console.log(stateBillData[x].title);
					//console.log(stateBillData[x].state);
					//console.log(stateBillData[x].state);
					//console.log(stateBillData[x].state);
					//console.log(stateBillData[x]);

					//var url = "http://openstates.org/api/v1/bills/ca/20092010/AB%20667?apikey=c16a6c623ee54948bac2a010ea6fab70"
					if (typeof stateBillData[x].id != "undefined"){
						var url = "http://openstates.org/api/v1/bills/"+stateBillData[x].id+"?apikey=c16a6c623ee54948bac2a010ea6fab70";
						request({
							    url: url,
							    json: true
							}, function (error, response, body) {

								if (!error && response.statusCode === 200) {

									var title = body.title
									var urlTitle = body.title.replace(/ /g,"-").toLowerCase();
									var model = {
										billContent: body,
										displayNumber: stateBillData[x].id,
										committee: 1,
										title: title,
										urlTitle: urlTitle,
										user: 1
									};

									//prelim add
									console.log(model)
									Bill.findOrCreate({displayNumber:stateBillData[x].id}, model)
									.exec(function(err, bill) {
										if (err) {
											return console.log(err);
										}
										else{
											console.log('CRE8')
											console.log(bill)
										}
									});


									//votes -- to attach to legislators and bills
									/*console.log(body.votes);
									if (typeof body.votes[0] != "undefined"){
										console.log(body.votes[0].yes_votes);
										console.log(body.votes[0].no_votes);
									}*/

								}

						});
					}

				}

		    }
	});

};


function govTracker(){

	/*govTrack.findRole({ current: true }, function(err, res) {
	  if (!err) {
	  	for (x in res.objects){
	  		console.log(res.objects[x].person);
	  	}
	  }
	});*/

	//govTrack.findBill({congress:114}, function(err, res) {
		//console.log(res)
		//var billArray = res.objects;
		//for (x in billArray){
		//	console.log( billArray[x].congress);
		//}
	//});

	govTrack.findVote({sort: '-created', limit:1000}, function(err, res) {

		for (x in res.objects){
			//console.log(res.objects[x])
			if (res.objects[x].related_bill != null){
				console.log(res.objects[x].related_bill)// --> cre8
			}
			//govTrack.findVoteVoter({vote: res.objects[x].id}, function(err, res) {
				//if (!err) {console.log(res)}
			//});
		}

	});

	/*govTrack.findBill({sort: '-introduced_date', limit:1000}, function(err, res) {
		if (!err) {
			for (x in res.objects){
				console.log(res.objects[x].introduced_date)
				var relatedBill = res.objects[x].title_without_number;
				govTrack.findVote({related_bill: res.objects[x].id}, function(err, res) {
					if (!err) {
						for (x in res.objects){
							govTrack.findVoteVoter({vote: res.objects[x].id}, function(err, res) {
								if (!err) {
									for (x in res.objects){
										console.log(res.objects[x].person.firstname + ' ' + res.objects[x].person.lastname + ' : ' + relatedBill + ' : ' + res.objects[x].option.value);
									}
								}
							});
						}
					}
				});


			}
		}
	});*/



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

module.exports.intervalService = function(){


	var states = Object.keys({
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
	});

	for (x in states){
		if(x <10){
			console.log(states[x])
			stateBills(states[x])
		}
	}

	//openStates();
	//stateBills('dc');
	//stateLegislators();
	//committees();
	//recentBills();
	//legislators();
    //setInterval(recentBills, 86400000);
    //setInterval(legislators, 86400000);

};