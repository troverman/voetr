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

//legacy get federalbills
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

//as an alternative to sunlight foundation apis -- not as good
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

module.exports.intervalService = function(){

	//for (x in Object.keys(states)){
		//dataService.stateBills(Object.keys(states)[x], 1, 50);
	//}
	//dataService.federalBills(1, 500);

	//dataService.cityCommittees();
	//dataService.stateCommittees();
	//dataService.federalCommittees();
	//dataService.nationalCommittees();

	//dataService.stateLegislators();
	//dataService.federalLegislators();

	setInterval(dataService.federalBills.bind(null, 1, 20), 14400000);








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