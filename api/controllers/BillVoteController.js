
//REFACTOR TO ASSOCIATION
module.exports = {
	get: async function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var filter = req.query.filter || {} //var bill = req.query.bill,var user = req.query.user
		var models = await BillVote.find(filter).limit(limit).skip(skip).sort(sort);
		//BillVote.watch(req);
		//BillVote.subscribe(req, model);
		res.json(models);
	},
	create: async function (req, res) {
		var model = {bill: req.param('bill'), user: req.param('user'), voteInteger: req.param('voteInteger')};
		if (req.param('voteInteger') == 1){model.voteString = "Yes"}
		if (req.param('voteInteger') == -1){model.voteString = "No"}
		var model = await BillVote.create(model);
		var billVoteCount = await BillVote.count().where({vote: req.param('bill')})
		var billModel = await Bill.find({id: req.param('bill')});
		if (req.param('voteInteger') == 1){billModel[0].plusCount = billModel[0].plusCount + 1;}
		if (req.param('voteInteger') == -1){billModel[0].minusCount = billModel[0].minusCount + 1;}
		billModel[0].voteCount = billVoteCount;
		var updated = await Bill.update({id: req.param('bill')}, billModel[0]);
		Vote.publishUpdate(req.param('bill'), updated);
		var billVoite = await BillVote.getOne(model.id);
		BillVote.publishCreate(billVote[0]);
		//contactService.sendEmail(votevote[0]);
		//contactService.sendFax(votevote[0]);
		//contactService.sendMail(votevote[0])
		res.json(billVote[0]);
	},
};

