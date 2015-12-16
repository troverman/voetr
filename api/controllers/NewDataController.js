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

							console.log(title);
							Committee.create({title:title, urlTitle:urlTitle}).exec(function createCB(err, created){
							  console.log('Commitee Created with title: ' + created.title);
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

						//console.log(model);
						Bill.create(model)
						.exec(function(err, bill) {
							if (err) {
								return console.log(err);
							}
							else {
								Bill.publishCreate(bill);
								res.json(bill);
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