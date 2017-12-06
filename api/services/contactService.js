var request = require('request');

module.exports = {

	sendEmail: function(data){

		Representative.find({constituent:data.user.id}).then(function(legislators){

			console.log(legislators[0].firstName, legislators[0].lastName);
			console.log(data.user)

			var templateModel = {
				legislator: legislators[0].firstName + ' ' + legislators[0].lastName,
				bill: data.bill,
				vote: data.vote,
				user: data.user,
				voteCount: 888,
				address: data.user.address,
				phone: '888-888-8888',
				email: data.user.email,
				constitutents: data.user.constitutentCount,
				voteString: data.voteString
			};

			emailService.sendTemplate('vote', 'troverman@gmail.com', 'A response to ' + data.vote.title, templateModel);


		});


	},

	sendFax: function(data){
		//potientally new endpoint
		var url = 'http://www.fax2dc.com/api/fax';

		var templateModel = {
			legislator: 'Bill Hammon',
			bill: data.bill,
			vote: data.vote,
			user: data.user,
			voteCount: 888,
			address: '123 Bluff Point',
			phone: '888-888-8888',
			email: 'cre8@voetr.com',
			constitutents: 8888,
			voteString: data.voteString
		}

		var template = emailService.prepareTemplate('vote', templateModel);

		//console.log(template)

		/*
		console.log(data)
		console.log(data.vote.type)
		console.log(data.vote.title)
		console.log(data.bill.title)
		console.log(data.voteString)
		console.log(data.user.first_name)
		console.log(data.user.email)
		*/

		//vote template, new bill template, changeing rep template.., think of edge cases
		//var faxContent = '<html>I, ' + data.user.first_name + ' your constituent voted ' + data.voteString + ' on the question ' + data.vote.title + ' for the bill ' + data.bill.title + ' please contact me at ' + data.user.email + ' thank you. </html>'
		//console.log(faxContent);

		//add auth token in headers.. 
		var form = {
			name: 'Trevor Overman',
			email: data.user.email,
			faxContent: template,
			legislatorList: ['formattedForFax...']
		};

		var requestModel = {
			url: url,
  			form: form
		};

		request.post(requestModel, function (error, response, body) {
			console.log(body)
		});

		//contactService.sendMail(data);
		
	},

	sendMail: function(data){
		//lob.com -- > $1 per mailing, send a summary per month? -- send only verified users.. with gov id 
		var Lob = require('lob')('test_504f76bd38f29ed7900e6f8d9236aaaff65');
		var name = data.user.email;

		var templateModel = {
			legislator: 'Bill Hammon',
			bill: data.bill,
			vote: data.vote,
			user: data.user,
			voteCount: 888,
			address: '123 Bluff Point',
			phone: '888-888-8888',
			email: 'cre8@voetr.com',
			constitutents: 8888,
			voteString: data.voteString
		}

		var template = emailService.prepareTemplate('letter', templateModel);

		Lob.letters.create({
		  description: 'A response to ' + data.vote.title,
		  to: {
		    name: 'Bernard Sanders',
		    address_line1: '123 Test Street',
		    address_city: 'Mountain View',
		    address_state: 'CA',
		    address_zip: '94041',
		    address_country: 'US',
		  },
		  from: {
		    name: data.user.firstName + ' ' + data.user.lastName,
		    address_line1: '3516 Bluff Point Dr',
		    address_city: 'Knoxville',
		    address_state: 'TN',
		    address_zip: '37920',
		    address_country: 'US',
		  },
		  file: template,
		  color: false
		}, function (err, res) {
		  console.log(err, res);
		});


	}

};