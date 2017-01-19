var request = require('request');
var openCongressApiKey = 'c16a6c623ee54948bac2a010ea6fab70';
module.exports = {

	federalCommittees: function(){
	},

	federalBills: function(){

		var model = {
			url: 'http://congress.api.sunlightfoundation.com/bills?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var billData = body.results;
				for (x in billData){
					var congress = billData[x].congress;
					var type = billData[x].bill_type;
					var number = billData[x].bill_id.replace(type, "").split("-")[0];
					var fullLink = 'http://api.fdsys.gov/link?collection=bills&billtype='+type+'&billnum='+number+'&congress='+congress+'&link-type=html';
					console.log(fullLink)
					//request(fullLink, function (error, response, body) {
						//console.log(body)
						//if (body){
							//if (body.trim().substring(0, 2)=="<!"){body = null;}
						//}
						//var model={};
						//Bill.findOrCreate({bill_id:bill_id}, model)
						//.exec(function(err, billModel) {
						//});
						//Bill.update({bill_id: bill_id}, model).then(function(){console.log('UPDATED THE BILL!')});
					//});
				}		
        	}
        });

	},

	federalVotes: function(){

		var model = {
			url: 'http://congress.api.sunlightfoundation.com/votes?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var voteData = body.results;
				for (x in voteData){
					console.log(voteData[x]);
					var billId = voteData[x].bill_id;
					var question = voteData[x].question;
					var url = voteData[x].url;
				}
        	}
        });

	},

	federalVoteVotes: function(){

		var model = {
			//url: 'http://congress.api.sunlightfoundation.com/votes?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		
        	}
        });
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

	stateVotes: function(state){
	},

	stateVoteVotes: function(state){
	}
}