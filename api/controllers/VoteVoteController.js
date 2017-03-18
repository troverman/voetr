/**
 * VoteVoteController
 * @description :: Server-side logic for managing VoteVotes
 */

module.exports = {

	/*
	getSome: function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		var filter = req.query.filter; //--> {filterType:filterParam} --> {bill:bill.id}
		VoteVote.getSome(limit, skip, sort, filter)
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		});
	*/

	getByBill: function(req, res) {
		//if req.query.bill...., if req.query.vote
		var bill = req.query.bill
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		VoteVote.getByBill(bill)
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByVote: function(req, res) {
		var vote = req.query.vote
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		console.log(vote)
		VoteVote.getByVote(vote)
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
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
		VoteVote.getByUser(user, limit, skip, sort)
		.then(function(model) {
			VoteVote.watch(req);
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getOne: function(req, res) {
		VoteVote.getOne(req.param('id'))
		.spread(function(model) {
			VoteVote.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getUserCount: function(req, res) {
		VoteVote.count()
		.where({user:req.param('id')})
		.exec(function(err, voteCount) {
			if (err) {return console.log(err);}
			else{res.json({ voteCount: voteCount });}
		});
	},

	create: function (req, res) {
		var model = {
			bill: req.param('bill'),
			user: req.param('user'),
			vote: req.param('vote'),
			voteInteger: req.param('voteInteger'),
		};

		if (req.param('voteInteger') == 1){model.voteString = "Yes"}
		if (req.param('voteInteger') == -1){model.voteString = "No"}

		VoteVote.create(model)
		.exec(function(err, model) {
			if (err) {return console.log(err);}
			else {
				VoteVote.count()
				.where({vote: req.param('vote')})
				.exec(function(err, VoteVoteCount) {
					console.log(VoteVoteCount);
					Vote.find({id: req.param('vote')}).then(function(voteModel){
						if (req.param('voteInteger') == 1){voteModel[0].plusCount = voteModel[0].plusCount + 1;}
						if (req.param('voteInteger') == -1){voteModel[0].minusCount = voteModel[0].minusCount + 1;}
						voteModel[0].voteCount = VoteVoteCount;
						Vote.update({id: req.param('vote')}, voteModel[0]).exec(function afterwards(err, updated){
							Vote.publishUpdate(req.param('vote'), updated);
						});
					})
				});
				VoteVote.getOne(model.id).then(function(votevote){
					VoteVote.publishCreate(votevote[0]);

					contactService.sendEmail(votevote[0]);
					contactService.sendFax(votevote[0]);
					contactService.sendMail(votevote[0])

					res.json(votevote[0]);
				});
			}
		});

	},

	update: function (req, res) {},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		VoteVote.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			VoteVote.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				VoteVote.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

