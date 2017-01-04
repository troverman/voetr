var request = require('request');

module.exports = {

	sendFax: function(data){
		console.log(data)
		var url = 'http://www.fax2dc.com/api/fax';
		var data = data;

		//req.bill;
		//req.user;
		//req.vote;

		//var model = {
		//	name: req.param('name'),
		//	email: req.param('email'),
		//	faxContent: req.param('faxContent'),
		//	legislator: legislatorList[x]
		//};

		var model = {
			url: url,
  			form: { mes: "heydude" } //data
		};

		request.post(model, function (error, response, body) {
			console.log(body)
		});
		
	},

	sendEmail: function(data){

		
	}


};