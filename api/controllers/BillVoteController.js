module.exports = {
	getByBill: async function(req, res) {
		var bill = req.query.bill
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0 ;
		var sort = req.query.sort || 'createdAt DESC';
		var bill = await BillVote.getByBill(bill);
		BillVote.watch(req);
		BillVote.subscribe(req, model);
		res.json(model);
	},
	getByUser: function(req, res) {
		var user = req.query.user
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0 ;
		var sort = req.query.sort || 'createdAt DESC';
		var model = await BillVote.getByUser(user, limit, skip, sort)
		BillVote.watch(req);
		BillVote.subscribe(req, model);
		res.json(model);
	},
	create: async function (req, res) {
		var model = {
			bill: req.param('bill'),
			user: req.param('user'),
			voteInteger: req.param('voteInteger'),
		};
		if (req.param('voteInteger') == 1){model.voteString = "Yes"}
		if (req.param('voteInteger') == -1){model.voteString = "No"}
		var model = await BillVote.create(model);
		var billVoteCount = await BillVote.count().where({vote: req.param('bill')})
		var billModel = await Bill.find({id: req.param('bill')}).then(function(billModel){
		if (req.param('voteInteger') == 1){billModel[0].plusCount = billModel[0].plusCount + 1;}
		if (req.param('voteInteger') == -1){billModel[0].minusCount = billModel[0].minusCount + 1;}
		billModel[0].voteCount = billVoteCount;
		var updated = await Bill.update({id: req.param('bill')}, billModel[0]).exec(function afterwards(err, updated){
		Vote.publishUpdate(req.param('bill'), updated);
		var billVoite = await BillVote.getOne(model.id);
		BillVote.publishCreate(billVote[0]);
		//contactService.sendEmail(votevote[0]);
		//contactService.sendFax(votevote[0]);
		//contactService.sendMail(votevote[0])
		res.json(billVote[0]);
	},
};

