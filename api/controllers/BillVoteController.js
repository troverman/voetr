/**
 * BillVoteController
 * @description :: Server-side logic for managing BillVotes
 */

module.exports = {

	getByBill: function(req, res) {
		var bill = req.query.bill
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		BillVote.getByBill(bill)
		.then(function(model) {
			BillVote.watch(req);
			BillVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByUser: function(req, res) {
		var user = req.query.user
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		BillVote.getByUser(user, limit, skip, sort)
		.then(function(model) {
			BillVote.watch(req);
			BillVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		var model = {
			bill: req.param('bill'),
			user: req.param('user'),
			voteInteger: req.param('voteInteger'),
		};

		if (req.param('voteInteger') == 1){model.voteString = "Yes"}
		if (req.param('voteInteger') == -1){model.voteString = "No"}

		BillVote.create(model)
		.exec(function(err, model) {
			if (err) {return console.log(err);}
			else {//voteCount
				BillVote.count()
				.where({vote: req.param('bill')})
				.exec(function(err, billVoteCount) {
					console.log(billVoteCount);

					Bill.find({id: req.param('bill')}).then(function(billModel){
						if (req.param('voteInteger') == 1){billModel[0].plusCount = billModel[0].plusCount + 1;}
						if (req.param('voteInteger') == -1){billModel[0].minusCount = billModel[0].minusCount + 1;}
						billModel[0].voteCount = billVoteCount;
						Bill.update({id: req.param('bill')}, billModel[0]).exec(function afterwards(err, updated){
							Vote.publishUpdate(req.param('bill'), updated);
						});
					});

				});
				BillVote.getOne(model.id).then(function(billVote){
					BillVote.publishCreate(billVote[0]);
					//contactService.sendEmail(votevote[0]);
					//contactService.sendFax(votevote[0]);
					//contactService.sendMail(votevote[0])
					res.json(billVote[0]);
				});
			}
		});

	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		BillVote.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			BillVote.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				BillVote.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}

};

