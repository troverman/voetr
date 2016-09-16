var request = require('request');
var govTrack = require('govtrack-node');
var Q = require('q');
var _ = require('lodash');

function bills(){

	govTrack.findBill({sort: '-introduced_date', limit:1000}, function(err, res) {
		if (!err) {
			for (x in res.objects){
				console.log(res.objects[x]);
			}
		}
	});

	var url = "http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70"

	request({
			    url: url,
			    json: true
			}, function (error, response, body) {

				//sails.log(body);

		    	if (!error) {

		        	var billData = body.results;
		        	for (i in billData){
		        		//console.log(billData[i].summary);
		        		console.log(billData[i]);
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
						//console.log(billData[i].bill_id);
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
				var title = bills[x].title_without_number;
				var billContent = bills[x].display_number;
				var displayNumber = bills[x].display_number;
				var model = {
					billContent: bills[x],
					displayNumber: displayNumber,
					committee: 1,
					title: title,
					urlTitle: title.replace(/ /g,"-").toLowerCase(),
					user: 1
				};
				(function(bills, x) {
					Bill.findOrCreate({displayNumber:displayNumber}, model)
					.exec(function(err, billModel) {
						if (!err) {
							Bill.publishCreate(billModel);
							(function(billModel) {
								govTrack.findVote({related_bill: bills[x].id, limit:1000}, function(err, res) {
									if(!err && res.objects){
										var votes = res.objects;
										if (!err && votes.length > 0) {
											for(x in votes){
												var model = {
													result: votes[x].result,
													required: votes[x].required,
													type: votes[x].vote_type,
													plusCount: votes[x].total_plus,
													minusCount: votes[x].total_minus,
													otherCount: votes[x].total_other,
													title: votes[x].question,
													urlTitle: title.replace(/ /g,"-").toLowerCase(),
													displayId: votes[x].id,
													bill: billModel.id,
													user: 1
												};
												(function(votes, x) {
													Vote.findOrCreate({displayId:votes[x].id}, model)
													.exec(function(err, voteModel) {
														if (!err){
															Vote.publishCreate(voteModel);
															(function(voteModel) {
																govTrack.findVoteVoter({vote: votes[x].id}, function(err, res) {
																	if(!err && res.objects){
																		var voteVoters = res.objects;
																		for(x in voteVoters){
																			(function(voteVoters, x) {
																				User.find()
																				.where({bioguide_id: voteVoters[x].person.bioguideid})
																				.then(function(userModel) {
																					var voteInteger = 0;
																					var voteString = voteVoters[x].option.value;
																					if(voteString == 'Yea' || voteString == 'Aye'){voteInteger = 1;}
																					if(voteString == 'Nay' || voteString == 'No'){voteInteger = -1;}
																					var model = {
																						voteInteger: voteInteger,
																						voteString: voteString,
																						vote: voteModel.id,
																						bill: billModel.id,
																						user: userModel[0].id
																					};
																					VoteVote.findOrCreate({bill: billModel.id, vote:voteModel.id, user: userModel[0].id}, model)
																					.exec(function(err, voteVoteModel) {
																						if (!err) {
																							//console.log(voteVoteModel)

																							/*
																							VoteVote.publishCreate(voteVoteModel);
																							VoteVote.count()
																							.where({bill: billModel.id, vote:voteModel.id, user: userModel[0].id})
																							.exec(function(err, voteCount) {
																								console.log(voteCount)
																								Vote.update({id: voteModel.id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
																								  if (err) {
																								    return;
																								  }
																								});
																							});
																							*/
	
																						}
																					});
																				});
																			})(voteVoters, x)
																		}
																	}
																});
															})(voteModel);
														}
													});
												})(votes, x);
											}
										}
									}
								});
							})(billModel);
						}
					});
				})(bills, x);
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

					var username = first_name.trim().replace('.','').replace(' ','.') + '.' + last_name.trim().replace(' ','.');
					var email =  stateData[x].email;
					if( typeof email === 'undefined' || email === null || typeof email === 'string' ){
						email = username + '@gmail.com';
					}
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

					User.findOrCreate({leg_id: leg_id}, model)
					.exec(function(err, user) {
						if (err) {
							return console.log(err);
						}
						else {
							User.publishCreate(user);
						}
					});
					User.update({leg_id: leg_id}, model);

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

function stateBillVotes(state){

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
		//if(x<=7){
		if( (x >= 0) && (x < 5) ){
		//if(x >= 40){
			//console.log(states[x])
			//stateBills(states[x])
		}
	}
	//bills()
	//openStates();
	stateBills('nc');
	//stateLegislators();
	//committees();
	//recentBills();
	//setInterval(recentBills(), 900000);

	//legislators();
    //setInterval(recentBills, 86400000);
    //setInterval(legislators, 86400000);

};