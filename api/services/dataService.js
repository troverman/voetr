var async = require('async');
var request = require('request');
var openCongressApiKey = 'c16a6c623ee54948bac2a010ea6fab70';
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


module.exports = {

	getLegislators: function(lat, lng){

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

	},

	cityCommittees: function(){
		var model = {
			url: 'https://gist.githubusercontent.com/mayurah/5f4a6b18b1aa8c26910f/raw/8dd2b9486874d283141cad8cccc5916e48c75dcd/countriesToCities.json',
			json: true,
		};
		request(model, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        var cityData = body;
		        for (var key in cityData) {
					if (cityData.hasOwnProperty(key)) {
						console.log(key)
				  		if(key == "United States"){
							var cityArray = cityData[key];
			        		for (var key in cityArray) {
			        			var title = cityArray[key];
								var urlTitle = cityArray[key].replace(/ /g,"-").toLowerCase();
								var model = {
									title: title,
									urlTitle: urlTitle,
								};
								Committee.findOrCreate({urlTitle: urlTitle}, model).exec(function createCB(err, created){
									console.log('city committee created')
								});

							}
				  		}
				  	}
				}
		    }
		});
	},


	//COMMITTEE IDS HERE LUL
	federalBills: function(pageStart, pageEnd){

		for (var page = pageStart; page <= pageEnd; page++){
			var model = {
				url: 'https://congress.api.sunlightfoundation.com/bills?&per_page=1&page=' + page + '&fields=actions,bill_id,bill_type,committee_ids,congress,keywords,number,official_title,related_bill_ids,short_title,summary,summary_short,urls,upcoming&apikey=' + openCongressApiKey,
				json: true,
			};
			request(model, function (error, response, body) {
				if (!error && body.results) {
					if (body.results.length>0){
						var billData = body.results[0];

						var actions = billData.actions;
						//Committee.find({officalId:committee_ids})
						//committees.activity
						var committees = billData.committee_ids;
						console.log(committees);

						var congress = billData.congress;
						var keywords = billData.keywords;
						var number = billData.number;
						var officialId = billData.bill_id;
						var officialUrl = billData.urls.congress;

						//Bill.find({officialId:related_bill_ids})
						var relatedBills = billData.related_bill_ids;

						var summary = billData.summary;
						var summaryShort = billData.summary_short;

						//User.find()
						var sponsor = billData.sponsor;

						var title;
						if (billData.short_title){title = billData.short_title}
						else{title = billData.official_title}
						var type = billData.bill_type;
						var urlTitle;
						if (title){urlTitle = title.replace(/ /g,"-").toLowerCase()}
						var upcoming = billData.upcoming;

						//console.log(upcoming);
						//console.log(actions)

						var fullTextLink = 'https://api.fdsys.gov/link?collection=bills&billtype=' + type + '&billnum=' + number + '&congress=' + congress + '&link-type=html';
						request(fullTextLink, function (error, response, body) {
							if (body){
								if (body.trim().substring(0, 2)=="<!"){body = null;}
							}
							var model = {
								actions: actions,
								billContent: 'billData',
								committee: 1,
								fullText: body,
								keywords: keywords,
								officialId: officialId,
								summary: summary,
								summaryShort: summaryShort,
								title: title,
								urlTitle: urlTitle,
								//upcoming: upcoming,
								user: 1 //sponsor
							};


							Bill.find({officialId:officialId})
							.then(function(billModel) {
								if (billModel.length === 0){
									Bill.create(model)
									.then(function(billModel) {
										console.log('BILL CREATED');
										dataService.federalVotes(billModel);
										Bill.publishCreate(billModel);
									});
								}
								else{
									Bill.update({officialId: officialId}, model)
									.then(function(billModel){
										console.log('BILL UPDATED');
										dataService.federalVotes(billModel[0]);
									});
								}
							});
						});
		        	}
	        	}
	        });
		}
	},

	federalCommittees: function(){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/committees?fields=chamber,committee_id,members,name,parent_committee_id&per_page=all&apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error && body.results) {
        		var committeeDataArray = body.results;
				async.eachSeries(committeeDataArray, function (committeeData, nextCommittee){ 
					var chamber = committeeData.chamber;
					var officialId = committeeData.committee_id;
					var members = committeeData.members;
					var title = committeeData.name;
					var urlTitle = title.toLowerCase().replace(/ /g,'-').replace(/,/g , '').replace(/'/g , '');
					var parent_committee_id = committeeData.parent_committee_id;
					var unitedStatesModel = {
						title: 'United States',
						urlTitle: 'united-states',
						parent: null
					};
					var newCommittee;
					if (chamber == 'house'){newCommittee = 'United States House of Representatives'}
					if (chamber == 'senate'){newCommittee = 'United States Sentate'}
					if (chamber == 'joint'){newCommittee = 'United States'}
					Committee.findOrCreate({urlTitle: unitedStatesModel.urlTitle}, unitedStatesModel)
					.then(function(committeeModel){
						if (newCommittee){
							var newLegCommitteeModel = {
								title: newCommittee,
								urlTitle: newCommittee.toLowerCase().replace(/ /g,'-'),
								parent: committeeModel.id
							};
							Committee.findOrCreate({urlTitle: newLegCommitteeModel.urlTitle}, newLegCommitteeModel)
							.then(function(newCommitteeModel){
								var model = {
									chamber: chamber,
									officialId: officialId,
									parent: newCommitteeModel.id,
									title: title,
									urlTitle: urlTitle,
									user: 1,
								};
								Committee.find({officialId:parent_committee_id})
								.then(function(committee){
									if (committee.length == 1){
										model.parent = committee[0].id;
									}
									Committee.findOrCreate({officialId: officialId}, model).then(function(committeeModel){
										console.log(members.length);
										if(members.length != 0){
											async.eachSeries(members, function (member, nextMember){
												User.find({bioguide_id:member.legislator.bioguide_id})
												.then(function(userModel){
													var title = member.title;
													if (title == null){title = 'Committee Member'}
													var committeeMemberModel = {
														committee: committeeModel.id,
														title: title,
														user: userModel[0].id
													};
													CommitteeMember.findOrCreate({committee: committee.id, user: userModel[0].id}, committeeMemberModel)
													.exec(function(err, committeeMember) {
														if (err) {return console.log(err);}
														else {
															console.log('COMMITTEE MEMBER CREATED')
															CommitteeMember.publishCreate(committeeMember);

															Committee.find({urlTitle: 'united-states'})
															.exec(function(err, committee) {
																if (err) {return console.log(err);}
																else {
																	var committeeMemberModel = {
																		committee: committee[0].id,
																		title: userModel[0].title,
																		user: userModel[0].id
																	};
																	CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
																	.exec(function(err, committeeMember) {
																		if (err) {return console.log(err);}
																		else {
																			console.log('COMMITTEE MEMBER CREATED US');
																			CommitteeMember.publishCreate(committeeMember);
																			if (userModel[0].chamber == 'senate'){
																				Committee.find({urlTitle: 'united-states-sentate'})
																				.exec(function(err, committee) {
																					if (err) {return console.log(err);}
																					else {
																						var committeeMemberModel = {
																							committee: committee[0].id,
																							title: userModel[0].title,
																							user: userModel[0].id
																						};
																						CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
																						.exec(function(err, committeeMember) {
																							if (err) {return console.log(err);}
																							else {
																								console.log('COMMITTEE MEMBER CREATED SENATE')
																								CommitteeMember.publishCreate(committeeMember);
																								process.nextTick(nextMember);
																							}
																						});
																					}
																				});
																			}
																			if (userModel[0].chamber == 'house'){
																				Committee.find({urlTitle: 'united-states-house-of-representatives'})
																				.exec(function(err, committee) {
																					if (err) {return console.log(err);}
																					else {
																						var committeeMemberModel = {
																							committee: committee[0].id,
																							title: userModel[0].title,
																							user: userModel[0].id
																						};
																						CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
																						.exec(function(err, committeeMember) {
																							if (err) {return console.log(err);}
																							else {
																								console.log('COMMITTEE MEMBER CREATED HOUSE')
																								CommitteeMember.publishCreate(committeeMember);
																								process.nextTick(nextMember);
																							}
																						});
																					}
																				});
																			}
																		}
																	});
																}
															});
														}
													});	
												});
											}, 
											function(err, results) {
												Committee.update({officialId: officialId}, model).then(function(){
													process.nextTick(nextCommittee);
												});
											});
										}
										else{
											Committee.update({officialId: officialId}, model).then(function(){
												process.nextTick(nextCommittee);
											});
										}
									});
								});
							});
						}
						else{process.nextTick(nextCommittee);}
					});
				});
			}
        });
	},

	//if dups --> resync to async
	federalLegislators: function(){

		var model = {
			url: 'http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {

		    if (!error && response.statusCode === 200) {

				var congressData = body.results;

				for (var key in congressData) {
					console.log(congressData[key])
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
						title: title,//--> this is on a committee basis
						district: district,
						term_end: term_end,
						term_start: term_start,
						bioguide_id: bioguide_id,
						avatarUrl: avatarUrl,
						coverUrl : coverUrl,
						chamber: chamber,
					};

					User.findOrCreate({bioguide_id: bioguide_id}, model)
					.exec(function(err, userModel) {
						if (err) {return console.log(err);}
						else {User.publishCreate(userModel);}
					});
					User.update({bioguide_id: bioguide_id}, model).then(function(){console.log('updated')});
				}
		    }
		});

	},

	federalVotes: function(bill){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/votes?bill_id=' + bill.officialId + '&fields=breakdown,question,required,result,roll_id,url,vote_type&apikey=' + openCongressApiKey,
			json: true,
		};
		(function(bill) {
			request(model, function (error, response, body) {
				if (!error && body.results) {
					if (body.results.length>0){
		        		var voteData = body.results;
						for (x in voteData){
							var voteModel = voteData[x];

							var billId = bill.id;
							var minusCount = voteData[x].breakdown.total.Nay;
							var plusCount = voteData[x].breakdown.total.Yea;
							var otherCount = voteData[x].breakdown.total['Not Voting']
							var required = voteData[x].required;
							var result = voteData[x].result;
							var title = voteData[x].question;
							var type = voteData[x].vote_type;
							var officialId = voteData[x].roll_id;
							var officialUrl = voteData[x].url;
							var urlTitle = voteData[x].question.replace(' ','-').toLowerCase();
							var model = {
								bill: bill.id,
								committee: 1,
								minusCount: minusCount,
								plusCount: plusCount,
								officialId: officialId,
								officialUrl: officialUrl,
								otherCount: otherCount,
								required: required,
								result: result,
								title: title,
								type: type,
								urlTitle: urlTitle,
								user: 1,
							};

							Vote.findOrCreate({officialId: officialId}, model)
							.then(function(voteModel) {
								console.log('VOTE FIND OR CREATE');
								dataService.federalVoteVotes(voteModel)
							})
							Vote.update({officialId: officialId}, model)
							.then(function(voteModel) {
								console.log('VOTE UPDATED');
							})

						}
					}
	        	}
	        });
		})(bill)	
	},

	federalVoteVotes: function(vote){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/votes?roll_id=' + vote.officialId + '&fields=voters&apikey=' + openCongressApiKey,
			json: true,
		};
		(function(vote) {
			request(model, function (error, response, body) {
				if (!error && body.results) {
					if (body.results.length>0){
						var voteVoteData = body.results[0].voters;
						for (x in voteVoteData){
							var voteVoteModel = voteVoteData[x];
							(function(vote, voteVoteModel) {
								User.find({bioguide_id: voteVoteModel.voter.bioguide_id})
								.then(function(userModel){
									var voteInteger = 0;
									var user = userModel;
									if(voteVoteModel.vote == 'Yea' || voteVoteModel.vote == 'Aye'){voteInteger = 1;}
									if(voteVoteModel.vote == 'Nay' || voteVoteModel.vote == 'No'){voteInteger = -1;}
									if(user[0]){user = userModel[0].id}
									var model = {
										voteInteger: voteInteger,
										voteString: voteVoteModel.vote,
										vote: vote.id,
										bill: vote.bill,
										user: user
									};

									VoteVote.findOrCreate({bill: model.bill, vote: model.vote, user: model.user}, model)
									.exec(function(err, voteVoteModel) {
										if (!err) {
											VoteVote.publishCreate(voteVoteModel);
											//break into positive and negative..!
											VoteVote.count()
											.where({vote:vote.id})
											.exec(function(err, voteCount) {
												console.log(voteCount)
												Vote.update({id: vote.id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
												  if (err) {
												    return;
												  }
												});
											});
										}
									});

								});
							})(vote, voteVoteModel);
						}
					}
	        	}
	        });
		})(vote);	
	},

	stateBills: function(state, pageStart, pageEnd){

		for (var page = pageStart; page <= pageEnd; page++){
			var model = {
				url: 'http://openstates.org/api/v1/bills/?state=' + state + '&per_page=1&page=' + page + '&apikey=' + openCongressApiKey,
				json: true,
			};
			request(model, function (error, response, body) {
				if (!error && body) {
					if (body.length>0){
	        			var billData = body[0];
	        			var officialId = billData.id;
						var model = {
							url: 'http://openstates.org/api/v1/bills/' + officialId + '?apikey=' + openCongressApiKey,
							json: true,
						};
						request(model, function (error, response, body) {
							if (!error && body) {
								//console.log(body)
			        			var billData = body;
			        			var officialId = billData.id;
			        			var state = billData.state;
								var title = billData.title;
								var urlTitle;
								if (body.title){urlTitle = body.title.replace(/ /g,"-").toLowerCase();}
								if (!body.title){urlTitle = ''}
								//mb add session

								var model = {
									billContent: 'billData',
									officialId: officialId,
									committee: 1, //-->multiple committees, or in the most granular, we need state here tho..
									title: title,
									urlTitle: urlTitle,
									user: 1
								};

								Bill.find({officialId:officialId})
								.then(function(billModel) {
									if (billModel.length === 0){
										Bill.create(model)
										.then(function(billModel) {
											console.log('BILL CREATED');
											dataService.stateVotes(state, billModel, billData.votes);
											Bill.publishCreate(billModel);
										});
									}
									else{
										Bill.update({officialId: officialId}, model)
										.then(function(billModel){
											console.log('BILL UPDATED');
											dataService.stateVotes(state, billModel[0], billData.votes);
										});
									}
								});
							}
						});
	        		}
				}
	        });
		}
	},

	nationalCommittees: function(){
		var model = {
			url: 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=troverman',
			json: true,
		};
		request(model, function (error, response, body) {
			var countryData = body.geonames;
			for(x in countryData){
				var title = countryData[x].countryName;
				var urlTitle = title.replace(/ /g,"-").toLowerCase();
				var model = {
					parent: null,
					title: title,
					urlTitle: urlTitle
				};
				Committee.findOrCreate({urlTitle: urlTitle}, model).exec(function createCB(err, created){
					console.log('national committee created')
				});
			}
		});
	},


	//TO GET COMMITTEE MEMBERS... PERFORM A COMMITTEE DETAIL GET --> WOOP
	stateCommittees: function(){
		var model = {
			url: 'https://openstates.org/api/v1//committees/?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				var committeeDataArray = body;
				committeeDataArray.push({state:'dc'})
				async.eachSeries(committeeDataArray, function (committeeData, next){ 


					var officialId = committeeData.id;

					/*
					var model = {
						url: 'http://openstates.org/api/v1/bills/' + officialId + '?apikey=' + openCongressApiKey,
						json: true,
					};
					request(model, function (error, response, body) {


					});
					*/



					var state = committeeData.state;
					var committee = committeeData.committee;
					var urlTitle = states[state.toUpperCase()].replace(/ /g,"-") + '-' + committee.toLowerCase().replace(/ /g,"-").replace(/,/g,"").replace(/'/g,"");
					var chamber = committeeData.chamber;
					var parent_id = committeeData.parent_id;
					var subcommittee = committeeData.parent_id;

					var newCommittee;
					if (chamber == 'lower'){newCommittee = states[state.toUpperCase()] + ' House of Representatives'}
					if (chamber == 'upper'){newCommittee = states[state.toUpperCase()] + ' Sentate'}

					Committee.find({urlTitle:'united-states'})
					.then(function(unitedStatesModel){
						//THIS IS THE STATE
						var newStateCommitteeModel = {
							title: states[state.toUpperCase()],
							urlTitle: states[state.toUpperCase()].toLowerCase().replace(/ /g,"-"),
							parent: unitedStatesModel.id 
						};
						//console.log(newCommittee);
						Committee.findOrCreate({urlTitle: newStateCommitteeModel.urlTitle}, newStateCommitteeModel)
						.then(function(committeeModel){
							//THESE ARE THE STATE HOUSES... --> PARENT IS THE STATE
							if (newCommittee){
								var newStateLegCommitteeModel = {
									title: newCommittee,
									urlTitle: newCommittee.toLowerCase().replace(/ /g,"-"),
									parent: committeeModel.id
								};

								Committee.findOrCreate({urlTitle: newStateLegCommitteeModel.urlTitle}, newStateLegCommitteeModel)
								.then(function(newCommitteeModel){

									//NEXT ARE THE INDIV COMMITTEES
									//if(parent_id){console.log('parent_id: ', parent_id)}
									//if(subcommittee){console.log('subcommittee: ', subcommittee)}
									//parent committees via if(parent_id)-->else parent is state house or senate etc. 

									var model = {
										officialId: officialId,
										title: committee,
										urlTitle: urlTitle,
										parent: newCommitteeModel.id,
										user: 1,
									};

									Committee.findOrCreate({officialId: officialId}, model).then(function(committee){
										console.log(committee)
										process.nextTick(next);
									});
									Committee.update({officialId: officialId}, model);

								});
								Committee.update({urlTitle: newStateLegCommitteeModel.urlTitle}, newStateLegCommitteeModel);
							}
							else{process.nextTick(next)}
						});
						Committee.update({urlTitle: newStateCommitteeModel.urlTitle}, newStateCommitteeModel);
					});
				});
			}
		});
	},

	//CAN ALSO GET COMMITTEE MEMBER HERE -----~~~~
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
					.replace(/\.\./g, '.')

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
						electedRepresentative: true,
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
					.exec(function(err, userModel) {
						if (err) {return console.log(err);}
						else {
							User.publishCreate(userModel);

							//GOTTA DO BOTH STATE AND HOUSE / SENTATE ETC --> as well as specific committees
							//STARTING COMMITTEE MEMBER CREATION.... THIS IS LEGIT --MAKE CODE ORGANIZED

							Committee.find({urlTitle: userModel.state.replace(' ','-').toLowerCase()})
							.exec(function(err, committee) {
								if (err) {return console.log(err);}
								else {
									console.log(committee)
									//GOTTA SCOPE AND FIND UNITED STATES AS PARENT COMMITTEE.. ETC ETC
									//--> THIS IS BIG
									//THIS IS HOW WE CAN 'VALIDATE' REPS,, by the commites that they serve in ---- COMMITTEEMEMBER...
									/*var committeeMemberModel = {
										committee: committee[0].id,
										title: userModel.title,
										user: userModel.id
									};

									CommitteeMember.findOrCreate({
										committee: committee[0].id,
										title: userModel.title,
										user: userModel.id
									}, committeeMemberModel)
									.exec(function(err, committeeMember) {
										if (err) {return console.log(err);}
										else {
											console.log('COMMITTEE MEMBER CREATED');
											CommitteeMember.publishCreate(committeeMember);											
										}
									});*/

								}
							});

						}
					});
					User.update({leg_id: leg_id}, model).then(function(){console.log('updated state')})
				}
		    }
		});
	},

	//OK
	stateLegislatorsCommitteeMembers: function(state){

		//STARTING COMMITTEE MEMBER CREATION.... THIS IS LEGIT --MAKE CODE ORGANIZED
		//STATE HOUSE, SENATE ETC --> SPECIFIC COMMITTEES, WORK WITH PARENT COMMITTEE...
		var committeeModel = {title: userModel.state, urlTitle: userModel.state.replace(' ','-').toLowerCase()}
		//SHOULD BE IN STATECOMMITTEE AREA.. --> THIS CREATED DUPLICATED

		Committee.findOrCreate({urlTitle: userModel.state.replace(' ','-').toLowerCase()}, committeeModel)
		.exec(function(err, committee) {
			if (err) {return console.log(err);}
			else {
				Committee.publishCreate(committee);


				//GOTTA SCOPE AND FIND UNITED STATES AS PARENT COMMITTEE.. ETC ETC
				//--> THIS IS BIG
				//THIS IS HOW WE CAN 'VALIDATE' REPS,, by the commites that they serve in ---- COMMITTEEMEMBER...
				var committeeMemberModel = {
					committee: committee.id,
					title: userModel.title,
					user: userModel.id
				};

				CommitteeMember.findOrCreate({
					committee: committee.id,
					title: userModel.title,
					user: userModel.id
				}, committeeMemberModel)
				.exec(function(err, committeeMember) {
					if (err) {return console.log(err);}
					else {
						console.log('COMMITTEE MEMBER CREATED');
						CommitteeMember.publishCreate(committeeMember);											
					}
				});

			}
		});

	},


	stateVotes: function(state, bill, votes){

		//state, billModel[0], billData.votes
		for (x in votes){
		    var billId = bill.id;
		    var committee = 1;
			var minusCount = votes[x].no_count;
			var officialId = votes[x].id;
			var officialUrl;
			if (votes[x].sources.length > 0){officialUrl = votes[x].sources[0].url}
			var otherCount = votes[x].other_count;
			var plusCount = votes[x].yes_count;
		 	var required = '';
			var result;
			if(result){var result = 'Passed'}
			if(!result){var result = 'Did Not Pass'}
			var title = votes[x].motion;
			var type = votes[x].type;
			var urlTitle = votes[x].motion.replace(' ','-').toLowerCase();
			var user = 1;

			var model = {
				bill: bill.id,
				committee: committee,
				minusCount: minusCount,
				officialId: officialId,
				officialUrl: officialUrl,
				otherCount: otherCount,
				plusCount: plusCount,
				required: required,
				result: result,
				title: title,
				type: type,
				urlTitle: urlTitle,
				user: user,
			};

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

			(function(votesArray) {
				Vote.findOrCreate({officialId: officialId}, model)
				.then(function(voteModel) {
					console.log('VOTE FIND OR CREATE');
					dataService.stateVoteVotes(state, voteModel, votesArray)
				})
				Vote.update({officialId: officialId}, model)
				.then(function(voteModel) {
					console.log('VOTE UPDATED');
				})
			})(votesArray);
		}
	},

	stateVoteVotes: function(state, vote, votes){
		for (x in votes){
			var voteVoteModel = votes[x];
			(function(vote, voteVoteModel) {
				User.find({leg_id: voteVoteModel.leg_id})
				.then(function(userModel){
					var user = userModel;
					if(user[0]){user = userModel[0].id}
					var model = {
						voteInteger: voteVoteModel.vote,
						voteString: voteVoteModel.voteString,
						vote: vote.id,
						bill: vote.bill,
						user: user
					};

					VoteVote.findOrCreate({bill: model.bill, vote: model.vote, user: model.user}, model)
					.exec(function(err, voteVoteModel) {
						if (!err) {
							VoteVote.publishCreate(voteVoteModel);
							//break into positive and negative..!
							VoteVote.count()
							.where({vote:vote.id})
							.exec(function(err, voteCount) {
								console.log(voteCount)
								Vote.update({id: vote.id}, {voteCount:voteCount}).exec(function afterwards(err, updated){
								  if (err) {
								    return;
								  }
								});
							});
						}
					});
				});
			})(vote, voteVoteModel);
		}
	}
}