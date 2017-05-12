/**
 * BillController
 * @description :: Server-side logic for managing Bills
 */

module.exports = {

	getActivity: function(req, res){

	},

	getOne: function(req, res) {
		Bill.getOne(req.param('id'))
		.spread(function(model) {
			Bill.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getByCommittee: function(req, res) {

		var committee = req.query.committee;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;

		//--> needs to go n deep? filter by children
		/*Committee.find({id:id})
        .then(function(committees){
			console.log(committees)
        	Committee.find({id:committees[0].parent}).then(function(committees){
        		console.log(committees)
        	})
        })*/

  	 	//{ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }

		Bill.native(function(err, collection){
			if (err){return res.negotiate(err)}
			collection
			.find({committees:{ $elemMatch:{id: committee}}})
			.sort({voteCount: -1 })
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.toArray(function(err, result){
				if (err){return res.negotiate(err)}
				console.log(result);
				console.log('HELLOOOO')
				return res.json(result);
			});
		});

		/*Bill.getByCommittee(id, limit, skip, sort)
		.then(function(models) {
			console.log(models.length)
			Bill.watch(req);
			Bill.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});*/
	},

	getCount: function(req, res) {
		Bill.count()
		.exec(function(err, billCount) {
			if (err) {return console.log(err);}
			else{
				res.json({ billCount: billCount });
			}
		});
	},

	getSome: function(req, res) {
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = req.query.sort;
		//var filter = req.query.filter;
		Bill.getSome(limit, skip, sort)
		.then(function(models) {
			Bill.watch(req);
			Bill.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	create: function (req, res) {
		var billContent = req.param('billContent');
		var committee = req.param('committee');
		var title = req.param('title');
		var user = req.param('user');

		var model = {
			billContent: billContent,
			committee: committee,
			title: title,
			urlTitle: title.replace(/ /g,"-").toLowerCase(),
			user: user
		};

		Bill.create(model)
		.exec(function(err, bill) {
			if (err) {return console.log(err);}
			else {
				Bill.publishCreate(bill);
				res.json(bill);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		// Otherwise, find and destroy the model in question
		Bill.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			Bill.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				Bill.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

