var async = require('async');
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
				var congress = bills[x].congress;
				var type = bills[x].bill_type_label.replace(/[,.]/g , '').toLowerCase();
				var number = bills[x].display_number.split(" ")[1];
				var fullLink = 'http://api.fdsys.gov/link?collection=bills&billtype='+type+'&billnum='+number+'&congress='+congress+'&link-type=html';
				(function(fullLink, bills,x) {
				request(fullLink, function (error, response, body) {
				if (body){if (body.trim().substring(0, 2)=="<!"){body = null;}}
				var title = bills[x].title_without_number;
				var billContent = bills[x].display_number;
				var displayNumber = bills[x].display_number;
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
											//BillVote
											Vote.findOrCreate({displayId:votes[y].id, title: votes[y].question}, model)
											.exec(function(err, voteModel) {
												console.log(voteModel)
												if (!err){
													//BillVote
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
																			VoteVote.findOrCreate({bill: billModel.id, vote:voteModel.id, user: user}, model)
																			.exec(function(err, voteVoteModel) {
																				if (!err) {
																					VoteVote.publishCreate(voteVoteModel);
																					VoteVote.count()
																					.where({vote:voteModel.id})
																					.exec(function(err, voteCount) {
																						console.log(voteCount)
																						//BillVote
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

function populateBills(){

	var billCount = 0;
	async.eachSeries(Object.keys(states), function (iterator, nextIteration){ 
		setTimeout(function () {
			dataService.federalBillsProPublica(billCount);
			billCount = billCount + 20;
			console.log(billCount);
			process.nextTick(nextIteration);
		}, 300000);
	});	

};

function populateStateBills(){

	async.eachSeries(Object.keys(states), function (iterator, nextIteration){ 
		setTimeout(function () {
			dataService.stateBills(iterator, 1, 50);
			process.nextTick(nextIteration);
		}, 180000);
	});	

};


//get city council
//get county council
function getRepsByLocation(address){
	//USE RECURSIVE OCDID to populate all city council members etc
	//--do by state
	//ocd-division/country:us/state:ut
	var model = {
		//url: 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDuNNenJANprqe8vwdk_v6wuN38EEUkJPs&address=3516 Bluff Point Dr, Knoxville TN',
		url: 'https://www.googleapis.com/civicinfo/v2/representatives/?key=AIzaSyDuNNenJANprqe8vwdk_v6wuN38EEUkJPs&address='+address,
		json: true,
	};
	request(model, function (error, response, body) {
		if(!error){
			//COMMITTEES---
			//console.log(body.divisions);
			//OFFICES---TITLES
			//console.log(body.offices);
			//OFFICIALS -- MAINTAIN INDEX?
			//console.log(body.officials);
			for (x in body.offices){
				var officialIndex = body.offices[x].officialIndices;
				var official = {};
				if (officialIndex.length == 1){official = body.officials[officialIndex]}
				else{official = body.officials[officialIndex[0]]}
				official.office = body.offices[x];
				console.log(official.name, official.office.name)
				console.log(official);
				//getRepsByGeo(official.office.divisionId)
				//User.find({firstName:official.name.split(' ')[0],})
				//console.log(body.offices[x]);
				//console.log(body.officials[body.offices[x].officialIndices]);
			}
		}
	});
};

function getRepsByGeo(OCDID, parent){
	var model = {
		url: 'https://www.googleapis.com/civicinfo/v2/representatives/'+encodeURIComponent(OCDID)+'?key=AIzaSyDuNNenJANprqe8vwdk_v6wuN38EEUkJPs&recursive=true',
		json: true,
	};
	request(model, function (error, response, body) {
		if(!error){
			for (x in body.offices){
				
				//CLT 4 at large councilmen - only getting the 1st
				//REDO THIS BLOCK
				//for loop though official vs offices
				//use array as astandard and loops though it for duplicates 
				var officialIndex = body.offices[x].officialIndices;
				//var official = {};
				var officialList = [];
				if(officialIndex){
					if (officialIndex.length == 1){
						officialList.push(body.officials[officialIndex])
						officialList[0].office = body.offices[x];
					}
					if (officialIndex.length > 1){
						for (y in officialIndex){
							officialList.push(body.officials[officialIndex[y]]);
							officialList[y].office = body.offices[x];
						}
					}
					else{
						officialList.push(body.officials[0]);
						officialList[0].office = body.offices[x];
					}
				}
				//official.office = body.offices[x];
				console.log(officialList)
				async.eachSeries(officialList, function (official, nextIteration){ 
				//for (x in officialList){
					//console.log(officialList[x].name, officialList[x].office.name);
					var newMember = {}
					if (official.name){
						newMember.firstName = official.name.split(' ')[0];
						newMember.lastName = official.name.split(' ')[official.name.split(' ').length-1];
						//hack
						if (newMember.lastName.length == 3){newMember.lastName = official.name.split(' ')[official.name.split(' ').length-2];}
						newMember.username = newMember.firstName + '.' +  newMember.lastName;
					}
					if(official.emails){newMember.email = official.emails[0]}
					else{newMember.email = newMember.username+'@voetr.com'}
					newMember.title = official.office.name;
					newMember.avatarUrl = official.photoUrl || 'images/avatar.png';
					//newMember.socialAccounts = official.channels;
					//if(newMember.avatarUrl){console.log(newMember);}
					//REDO THIS BLOCK

					//console.log(newMember);

					//ADD COMMITTEE FINDING FEATURES RE DYNAMIC VS PARENTID
					(function(newMember) {
						User.find({username:newMember.username})
						.then(function(userModel) {
							if (userModel.length === 0){
								User.create(newMember)
								.then(function(userModel) {
									console.log('USER CREATED');
									User.publishCreate(userModel);
									console.log(userModel)
									CommitteeMember.findOrCreate({committee:parent.id, user:userModel.id, title:userModel.title}).then(function(committeeMemberModel){
										console.log(committeeMemberModel);
										process.nextTick(nextIteration);
									});
								});
							}
							else{
								//User.update({username:newMember.username}, newMember)
								//.then(function(userModel){
									//console.log('USER UPDATED');
									//console.log(userModel)
									//console.log(parent)
									CommitteeMember.findOrCreate({committee:parent.id, user:userModel[0].id, title:userModel[0].title}).then(function(committeeMemberModel){
										console.log(committeeMemberModel);
										process.nextTick(nextIteration);
									});
								//});
							}
						});
					})(newMember);
				//}
				})
	

				//ocdDivision
				//Committee.find({title: {contains: OCDID.split(':')[OCDID.split(':').length-1]}}).then(function(model){console.log(model)})
				//CommitteeMember.create({committee:committee.id, user:user.id})
				//console.log(official);
				//console.log(body.offices[x]);
				//console.log(body.officials[body.offices[x].officialIndices]);


			}
		}
	});
};



module.exports.intervalService = function(){
	//images/avatar.png
	/*User.find({avatarUrl:{contains:'https://ui-avatars.com/api'}}).then(function(models){
		for (x in models){
			var colorArray = ['2ab996', '24242e', 'ff6a6a', 'ddbea8'];
        	var randInt = Math.floor(Math.random() * (colorArray.length + 1));
			var url = 'https://ui-avatars.com/api/?size=256&name='+models[x].firstName+'+'+models[x].lastName+'&color=fff&background='+colorArray[randInt];
			User.update({id:models[x].id}, {avatarUrl:url}).then(function(model){console.log(model)});
		}
	})*/

	//NEED TO DELETE USERS CREATED ON NOV 19TH -- NOV 20TH
	//2017-11-20T03:22:27.545Z
	//2017-11-20T03:22:27.545Z
	/*var now1 = new Date('2017-12-08T03:22:27.545Z');
	var now = new Date(), start = new Date(now.getTime() - (24 * 12 * 60 * 60 * 1000));
	CommitteeMember.find()
    .where({createdAt: {'>': start}})
    .exec(function (err, users) {
    	console.log(users.length)
    	console.log(users[0])
    	for (x in users){
    		//console.log(users[x])
    		CommitteeMember.destroy({id:users[x].id}).then(function(model){console.log(model)});
    	}
    });

	User.find()
    .where({createdAt: {'>': start}})
    .exec(function (err, users) {
    	console.log(users.length)
    	console.log(users[0])
    	for (x in users){
    		//console.log(users[x])
    		User.destroy({id:users[x].id}).then(function(model){console.log(model)});
    	}
    });*/
	

	//ocd-division/country:us/state:nc/county:orange
	///place:charlotte
	//Committee.find({title:'maryville'}).then(function(model){console.log(model)})
	//county meck --> 59485ad892184ba71e1d8a58
	//getRepsByGeo('ocd-division/country:us/state:nc/place:charlotte', {id:'59486064959d31941fc8c5e9'})
	//getRepsByGeo('ocd-division/country:us/state:nc/county:mecklenburg', {id:'59485ad892184ba71e1d8a58'})
	//getRepsByGeo('ocd-division/country:us/state:tn/county:knox', {id:'59485b06c0b6b2b11e13573f'})
	//getRepsByGeo('ocd-division/country:us/state:tn/place:knoxville', {id:'59486093ea08c19c1fb7461c'})


	//getRepsByLocation('35.909907, -79.072057');
	//getRepsByLocation('3516 Bluff Point Dr, Knoxville TN');
	//getRepsByLocation('Moab Utah');
	//getRepsByLocation('35.974523999999995,-83.92462109999997');

	//Committee.find({ocdDivision:{contains:'country:us/state:tn'}}).then(function(models){
		//console.log(models)
		//for (x in models){
			//getRepsByGeo(models[x].ocdDivision, models[x]);
		//}
	//})

	//Committee.find({title:'knox county'}).then(function(models){
	//	console.log(models)
		//for (x in models){
			//getRepsByGeo(models[x].ocdDivision, models[x]);
		//}
	//})

	//getRepsByGeo('ocd-division/country:us/state:nc', {id:'589d7b59a3806e1100faa70d', title:'North Carolina'})

	//gotta get child-parent relationship and store ocd-devision.. 
	//Committee.update({title:'United States'}, {ocdDivision:'ocd-division/country:us'}).then(function(model){console.log(model)})
	//might wanna do this via decentralization 

	//use to get counties and ocdDivision ish.. 
	//--deeper than county, place

	function recursive(model, string){
		if (model && model.id){
			Committee.find({parent:model.id}).then(function(models){
				for (x in models){
					if(models[x].title.includes("County")){models[x].ocdDivision = string + '/county:'+models[x].title.replace(" County","").toLowerCase();}
					else{models[x].ocdDivision = string + '/place:'+models[x].title.toLowerCase().replace(" township","").replace("township of ","").replace("city of ","")}
					if(models[x].geonameId){
						Committee.update({id:models[x].id}, {ocdDivision: models[x].ocdDivision}).then(function(committeeModel){
							//console.log(model[0]);
							getRepsByGeo(committeeModel[0].ocdDivision, committeeModel[0]);
							console.log(committeeModel[0].ocdDivision);
							recursive(committeeModel[0], string);
						});
					}
				}
			});
		}
	};

	Committee.find().then(function(model){
		var delay = 1;
		for (x in model){
			//console.log(model[x])
			
			if(model[x].ocdDivision){
				delay++;
				setTimeout(function() {
					getRepsByGeo(model[x].ocdDivision, model[x])
				}, delay*10000);
				//if(model[x].ocdDivision.includes("place")){
					//console.log(model[x].ocdDivision);
					//getRepsByGeo(model[x].ocdDivision, model[x])
				//}
			}
		}
	});

	//all are being add to TN
	for (x in Object.keys(states)){
		var string = 'ocd-division/country:us/state:'+Object.keys(states)[x].toLowerCase();
		(function(string, x) {
			setTimeout(function() {
				Committee.find({parent:'589d5cb5771e7fecb9300213', title:states[Object.keys(states)[x]]}).then(function(model){
					recursive(model[0], string);
					//console.log(model);
					//getRepsByGeo(string, model[0]);
					//Committee.update({id:model[0].id}, {ocdDivision: string}).then(function(model){console.log(model)})
					if (model.length > 0){
						//console.log(model[0])
						//if(model[0].geonameId){dataService.getGeoNamesByParent(model[0].geonameId, model[0].id, 'troverman', -2);}
						//console.log(string, model[0].id);
						//getRepsByGeo(string, model[0]);
					}
				});
			}, x*5000);
		})(string, x);
		//getRepsByGeo(string)
		//dataService.stateBills(Object.keys(states)[x], 1, 25);
	}
		
	//for(var i = 0; i < 3; i++) {
	//    (function(index) {
	//        setTimeout(function() { alert(index); }, index*5000);
	//    })(i);
	//}


	
	//dataService.stateBills('nc', 1, 25);
	//dataService.cityCommittees();
	//dataService.stateCommittees();
	//dataService.federalCommittees();
	//dataService.nationalCommittees();
	//dataService.stateLegislators();
	//dataService.federalLegislators();
	//dataService.federalBillsProPublica(0);
		
	//dataService.federalBillsProPublica(20);
	//dataService.federalBillsProPublica(40);
	//dataService.federalBillsProPublica(60);
	//dataService.federalBillsProPublica(80);
	//dataService.federalBillsProPublica(100);

	//world
	//dangerous alg :|
	//dataService.getNamesWorld();

	//US
	//dataService.getGeoNamesByParent(6252001, '589d5cb5771e7fecb9300213', 'voetr5', 1);

	//NC
	//dataService.getGeoNamesByParent(4482348, '589d7b59a3806e1100faa70d', 'voetr3', -2);

	//TN
	//dataService.getGeoNamesByParent(4662168, '589d7fc0a3806e1100fad746', 'voetr1', -2);

	//india
	//dataService.getGeoNamesByParent(1269750, '589d5eedccfbd7ecba29388a', 'voetr3', -1);

	//china
	//dataService.getGeoNamesByParent(1814991, '589d5eecccfbd7ecba29381c', 'voetr4', -1);

	//uk
	//dataService.getGeoNamesByParent(2635167, '589d5eecccfbd7ecba2937f0', 'voetr5', -1);

	//setInterval(dataService.federalBillsProPublica.bind(null, 0), 14400000);

	//populateBills();
	//populateStateBills();

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