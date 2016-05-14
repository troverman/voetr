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
				var title = res.objects[x].title_without_number;
				var billContent = res.objects[x].display_number
				var displayNumber = res.objects[x].display_number
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
						Bill.publishCreate(bill);
						console.log(bill);
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
															Vote.findOrCreate([{bill:bill},{user:user},{vote:vote}], model)
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
						bioguide_id: bioguide_id
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


module.exports.intervalService = function(){
	//recentBills();
	//legislators();
    setInterval(recentBills, 86400000);
    setInterval(legislators, 86400000);

    //recentBills(govTracker, 80000);

};