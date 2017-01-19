var request = require('request');
var openCongressApiKey = 'c16a6c623ee54948bac2a010ea6fab70';

module.exports = {

	federalCommittees: function(){
	},

	federalBills: function(){

		var model= {
			url: 'http://congress.api.sunlightfoundation.com/bills?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var billData = body.results;
				for (x in billData){
					console.log(billData[x]);
				}
        	}
        });

	},

	federalVotes: function(){

		var model= {
			url: 'http://congress.api.sunlightfoundation.com/votes?apikey=' + openCongressApiKey,
			json: true,
		};
		request(model, function (error, response, body) {
			if (!error) {
        		var voteData = body.results;
				for (x in voteData){
					console.log(voteData[x]);
				}
        	}
        });

	},

	federalVoteVotes: function(){
	},

	stateBills: function(state){
	},

	stateVotes: function(state){
	},

	stateVoteVotes: function(state){
	}
}