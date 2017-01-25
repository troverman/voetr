var request = require('request');
var openCongressApiKey = 'c16a6c623ee54948bac2a010ea6fab70';
module.exports = {

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

					var chamber = committeeData[x].chamber;
					var officialId = committeeData[x].committee_id;
					var title = committeeData[x].name;
					var urlTitle = name.toLowerCase().replace(/ /g,"-");
					var parent_committee_id = committeeData[x].parent_committee_id;
					var subcommittee = committeeData[x].subcommittee;

					var model = {
						chamber: chamber,
						officialId: officialId,
						parent: parent_committee_id,
						title: title,
						urlTitle: urlTitle,
						user: 1,
					};

					Committee.findOrCreate({committee_id: committee_id},model).exec(function createCB(err, created){
						//if find - update, if not, create
						console.log('created state committee')
					})
					Committee.update({committee_id: committee_id}, model).then(function(){console.log('updated state committee')})

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
								minusCount :minusCount,
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

							Vote.find({officialId:officialId})
							.then(function(voteModel) {
								if (voteModel.length === 0){
									Vote.create(model)
									.then(function(voteModel) {
										console.log('VOTE CREATED');
										dataService.federalVoteVotes(voteModel);
										Vote.publishCreate(voteModel);
									});
								}
								else{
									Vote.update({officialId: officialId}, model)
									.then(function(voteModel){
										console.log('VOTE UPDATED');
										dataService.federalVoteVotes(voteModel);
									});
								}
							});

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
							})(vote, voteVoteModel)	
						}
					}
	        	}
	        });
		})(vote)	

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
					console.log(stateData[x])
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