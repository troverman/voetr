//TODO: REFACTOR TO ASSOCIATION
module.exports = {
	getByCommiteeAndChildren: function(req, res) {
		//need to get only the most recent limit - skip...... 
		//by sort with multiple models.. --> gotaa solve this deyud. 
		//gotta put some limit to this too.... 
		//lul --> can explode. --> how to make this work at scale?
		//united-states-tn-tncounties-cities..... eek
		//mb sort CommitteeBill by date created -- check if CommitteeBill is in the parent-child tree? -- then subtact the limit skip..hm 
		//mb this is #toomuch
		var billList = [];
		var recursiveCommittee = async function(committeeId){
			var committeeModel = await Committee.find({parent:committeeId});
			if (committeeModel.length !=0){
				for (x in committeeModel){
					var parent = committeeModel[x].id;
					var committeeBillModel = await CommitteeBill.find({committee:parent});
					if (committeeBillModel.length!=0){billList.concat(committeeBillModel)}
					console.log(committeeBillModel.length)
					recursiveCommittee(parent);
				}
			}
		};
		recursiveCommittee(req.query.committee)
		res.json([]);
	},
	get: async function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var filter = req.query.filter || {};
		var models = await CommitteeBill.find(filter).limit(limit).skip(skip).sort(sort);
		//CommitteeBill.watch(req);
		//CommitteeBill.subscribe(req, model);
		res.json(models);
	},
	create: async function (req, res) {
		var model = {bill: req.param('bill'), committee: req.param('committee')};
		var commiteeBillModel = await CommitteeBill.create(model)
		CommitteeBill.publishCreate(committeeBillModel);
		res.json(committeeBillModel);
	},
};

