/**
 * CommitteeBillController
 * @description :: Server-side logic for managing CommitteeBills
 */

module.exports = {

	getSome: function(req, res) {
		//req.query.filter = {committee:committee.id}
		console.log(req.query.filter)
		CommitteeBill.getSome(req.query.limit, req.query.skip, req.query.sort, req.query.filter)
		.then(function(models) {
			console.log(models)
			CommitteeBill.watch(req);
			CommitteeBill.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getByCommiteeAndChildren: function(req, res) {

		//need to get only the most recent limit - skip...... by sort with multiple models.. --> gotaa solve this deyud. 

		var billList = [];
		//gotta put some limit to this too.... lul --> can explode. --> how to make this work at scale?
		//united-states-tn-tncounties-cities..... eek
		//mb sort CommitteeBill by date created -- check if CommitteeBill is in the parent-child tree? -- then subtact the limit skip..hm 
		//mb this is #toomuch
		
		var recursiveCommittee = function(committeeId){
			Committee.find({parent:committeeId}).then(function(committeeModel){

				if (committeeModel.length !=0){
					for (x in committeeModel){
						//console.log(committeeModel[x]);
						var parent = committeeModel[x].id;

						CommitteeBill.find({committee:parent}).then(function(committeeBillModel){

							if (committeeBillModel.length!=0){
								billList.concat(committeeBillModel)
							}

							console.log(committeeBillModel.length)


						});

						recursiveCommittee(parent);

					}
				}

			});
		};

		recursiveCommittee(req.query.committee)//.then(function(models){
			//add
			res.json([]);

		//});


		//Committee.find
		//CommitteeBill.find(co)

	},

	create: function (req, res) {
		var model = {
			bill: req.param('bill'),
			committee: req.param('committee'),
		};
		CommitteeBill.create(model)
		.exec(function(err, committeeBillModel) {
			if (err) {return console.log(err);}
			else {
				CommitteeBill.publishCreate(committeeBillModel);
				res.json(committeeBillModel);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {return res.badRequest('No id provided.');}
		CommitteeBill.findOne(id).exec(function(err, model) {
			if (err) {return res.serverError(err);}
			if (!model) {return res.notFound();}
			CommitteeBill.destroy(id, function(err) {
				if (err) {return res.serverError(err);}
				CommitteeBill.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}
	
};

