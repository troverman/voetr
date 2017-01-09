var request = require('request');

module.exports = {

	sendFax: function(data){
		console.log(data)
		var url = 'http://www.fax2dc.com/api/fax';
		var data = data;

		//req.bill;
		//req.user;
		//req.vote;

		var form = {
			name: 'Trevor Overman',
			email: 'troverman@gmail.com',
			faxContent: '<html>html content here!</html>',
			legislatorList: ['formattedForFax...']
		};

		var model = {
			url: url,
  			form: form
		};

		request.post(model, function (error, response, body) {
			console.log(body)
		});
		
	},

	sendEmail: function(data){

		
	}


};