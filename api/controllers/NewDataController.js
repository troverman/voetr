var request = require("request");

module.exports = {

	cities: function(req, res) {

		var url = "https://gist.githubusercontent.com/mayurah/5f4a6b18b1aa8c26910f/raw/8dd2b9486874d283141cad8cccc5916e48c75dcd/countriesToCities.json";

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {

		        var cityData = body;
		        sails.log("********CITY DATA********")

		        for (var key in cityData) {
				  if (cityData.hasOwnProperty(key)) {
				  	if(key == "United States"){

						//sails.log(key + " -> " + cityData[key]);

						var cityArray = cityData[key];

		        		for (var key in cityArray) {

		        			var title = cityArray[key];
							var urlTitle = cityArray[key].replace(/ /g,"-").toLowerCase();

							if (urlTitle == 'knoxville'){console.log('knoxville')}

							var model = {
								title: title,
								urlTitle: urlTitle,
							};

							//console.log(title);
							Committee.findOrCreate({urlTitle: urlTitle},model).exec(function createCB(err, created){
								//if(!err){console.log(created);}
							});

						}
				  	}
				  }
				}

		    }
		});

	},

	bills: function(req, res) {

		var url = "http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70";

		request({
			    url: url,
			    json: true
			}, function (error, response, body) {

			    if (!error && response.statusCode === 200) {

			        var billData = body.results;

					for (var key in billData) {

						var billId = billData[key].bill_id;
						var bill_type = billData[key].bill_type;
				        var chamber = billData[key].chamber;
						var committee_ids = billData[key].committee_ids;
						var congress = billData[key].congress;
						var cosponsors_count = billData[key].cosponsors_count;
						var enacted_as = billData[key].enacted_as;
						var history = billData[key].history;
						var introduced_on = billData[key].introduced_on;
						var last_action_at = billData[key].last_action_at;
						var last_version_on = billData[key].last_version_on;
						var last_vote_at = billData[key].last_vote_at;
						var number = billData[key].number;
						var official_title = billData[key].official_title;
						var popular_title = billData[key].popular_title;
						var related_bill_ids = billData[key].related_bill_ids;
						var short_title = billData[key].short_title;
						var sponsor = billData[key].sponsor;
						var sponsor_id = billData[key].sponsor_id;
						var urls = billData[key].urls;

						/*console.log(billId);
						console.log(official_title);
						console.log(last_action_at);
						console.log(urls);
						console.log(sponsor);*/

						var title = billData[key].official_title;
						var billContent = billData[key].bill_id; + ' : ' + billData[key].official_title + ' : ' + billData[key].sponsor + ' : ' + billData[key].introduced_on
						var model = {
							billContent: billContent,
							committee: 1,
							title: title,
							user: 1
						};


						console.log(billData[key])
						//console.log(model);
						/*Bill.create(model)
						.exec(function(err, bill) {
							if (err) {
								return console.log(err);
							}
							else {
								Bill.publishCreate(bill);
								res.json(bill);
							}
						});*/
					}
			    }
		});

	},

	votes: function(req, res) {
		console.log('ok')
		var govTrack = require('govtrack-node');

		/*var url = "http://congress.api.sunlightfoundation.com/votes?apikey=c16a6c623ee54948bac2a010ea6fab70";
		console.log(url);

		request({
			    url: url,
			    json: true
			}, function (error, response, body) {

			    if (!error && response.statusCode === 200) {

			        var voteData = body.results;
			        console.log('ok');
			        console.log(voteData);
					for (var key in voteData) {
						var vote = voteData[key];
						var bill_id = vote.bill_id;
						var question = vote.question;
						var voters = vote.voters;
						console.log(voters);
					}
			    }
		});*/
	},

	addCongress: function(req, res) {

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

	},


	ticker: function(req, res) {

		function ticker(){

		    var url = "https://cex.io/api/ticker/GHS/BTC";
			request({
				    url: url,
				    json: true
				}, function (error, response, body) {

				    if (!error && response.statusCode === 200) {

				        var tickerData = body;
				        console.log(tickerData);

				    }
			});

		} 
		setInterval(ticker, 5000);

	},



	currency: function(req, res) {

		function ticker(){

			var url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"

			request({
					    url: url,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        var currencyData = body.list.resources;

							for (var key in currencyData) {

					        	var pairData = currencyData[key].resource.fields;

								var name = pairData.name;
								var price = pairData.price;
								var symbol = pairData.symbol;
								var timeStamp = pairData.ts;
								var utctime = pairData.utctime;

								sails.log(name);
								sails.log(price);
								//sails.log(timeStamp);

					    	}

					    }
				});

		}

		setInterval(ticker, 2000);

	}




};