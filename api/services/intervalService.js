var request = require('request');

function ticker(){

	var url = "http://congress.api.sunlightfoundation.com/bills?apikey=c16a6c623ee54948bac2a010ea6fab70"

	request({
			    url: url,
			    json: true
			}, function (error, response, body) {

				//sails.log(body);

		    	if (!error) {

		        	var billData = body.results;
		        	for (i in billData){

		        		/*sails.log(billData[i].bill_id);
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
						sails.log(billData[i].urls.congress);*/


						var title = billData[i].official_title;
						var billContent = billData[i].bill_id; + ' : ' + billData[i].official_title + ' : ' + billData[i].sponsor + ' : ' + billData[i].introduced_on + ' : ' + billData[i].urls.congress

						var model = {
							billContent: billContent,
							committee: 1,
							title: title,
							user: 1
						};


						Bill.findOrCreate({title:title}, model)
						.exec(function(err, bill) {
							if (err) {
								return console.log(err);
							}
							else {
								Bill.publishCreate(bill);
								console.log(bill);
							}
						});
		        	}


		    	}
		});

}


module.exports.intervalService = function(){
	//every 8 hours
    setInterval(ticker, 28800000);
    //setInterval(ticker, 8000);


};