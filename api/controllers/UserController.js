module.exports = {

	getActivity: function(req, res){

		//CommitteeMember.getSome(req.query.limit, req.query.skip, req.query.sort, req.query.filter).then(function(models){

		//})

		//GOTTA GET WHEN OTHER FILTER FOR POST == PROFILE + USER
		
		Post.getSome(req.query.limit, req.query.skip, req.query.sort, req.query.filter).then(function(postModels){

			VoteVote.getSome(req.query.limit, req.query.skip, req.query.sort, req.query.filter).then(function(voteModels){

				var combinedModels = postModel.concat(voteModel);
				combinedModels.sort(function(a,b) {return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0);}); 

				res.json(combinedModels);

			});

		});

	},

	getOne: function(req, res) {
		User.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	getSome: function(req, res) {

		User.getSome(req.query.limit, req.query.skip, req.query.sort)
		.then(function(models) {
			User.watch(req);
			User.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getMine: function(req,res){
		if (req.user){
			var me = req.user.id;
			User.findOne(me)
			.populate('passports')
			.then(function(user){
				return res.json(user);
			})
			.catch(function(err){
				return res.negotiate(err);
			});
		}
		else{return res.json();}
	},

	getCount: function(req, res) {
		User.count()
		.exec(function(err, userCount) {
			if (err) {return console.log(err);}
			else{res.json({ userCount: userCount });}
		});
	},

	getByUsername: function(req, res) {
		User.find()
		.where({username: req.param('path')})
		.spread(function(model) {
			User.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	getActivity: function(req, res) {

	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			firstName: req.param('firstName'),
			avatarUrl: req.param('avatarUrl')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},

	update: function(req,res){
		var id = req.session.user.id
		var model = {
			//email: req.param('email'),
			firstName : req.param('firstName'),
			lastName : req.param('lastName'),
			//username : req.param('username'),
			avatarUrl: req.param('avatarUrl'),
			coverUrl: req.param('coverUrl'),
			identificationUrl: req.param('identificationUrl'),
			address: req.param('address'),

		};

		User.update({id: id}, model)
		.then(function(model){
			User.publishUpdate(id, model);
			res.json(model);
		});

	},

	upload: function(req,res){
		res.setTimeout(0)
		var options = {
			adapter: require("skipper-s3"),
			key: 'AKIAJWRI5PIDP5OGKGLQ',
		 	secret: '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',
		 	bucket: 'voetr',
		}
		var byteCount = req.file('picture')._files[0].stream.byteCount

		req.file('picture')
		.on('progress', function (event){
			//why is this doubled
			//server processing --> to s3. 
			//need to programatically delete s3 chunks if fail / and on delete
			var percentageUploaded = event.written/byteCount
			console.log(percentageUploaded)
			//File.publishUpdate(newFile.id, event)
		})
		.upload(options, function response(err,uploadedFiles){
			console.log('we are in the code')
			if (err) {
		    	return res.negotiate(err);
		    	console.log(err)
		    }
		    if (uploadedFiles.length === 0){
		    	return res.badRequest('No file was uploaded');
		    }
		    console.log(uploadedFiles)
		    var amazonUrl = uploadedFiles[0].extra.Location;
		    return res.json({amazonUrl: amazonUrl});
		});

	},

	removePassport: function(req,res){
		var id = req.session.user.id;
		var provider = req.param("provider");
		Passport.destroy({user: id, provider: provider})
		.then(function(passport){
			User.find(id).then(function(model){
				model.socialAccounts[(passport[0].provider).toString()] = {};
				User.update({id:id}, model);
			})
			res.json(passport);
		})
		.fail(function(err){
			res.json(err);
		});
	},

	reset: function(req,res){
		var token = req.param("token");
		var newPassword = req.param("password");
		User.find({passwordResetToken: token, resetTokenExpiresAfter: {">": Date.now() }})
		.populate("passports")
		.then(function(user){
			if (!user.length){
				req.flash("error", "Reset token is invalid or expired");
				res.redirect("/reset/" + token);
			}

			/*shouldnt have to throw an error here but make sure only users who have
			local auth setup can get here*/
			var localPassport = user[0].passports.filter(function(passport){
				return passport.protocol == "local";
			})[0];

			Passport.update({id: localPassport.id}, {password: newPassword})
			.then(function(user){
				if (!user.length){
					req.flash("error", "Password was not reset");
					res.redirect("/reset/" + token);
				}
				return res.redirect("/reset-success");
			})
			.fail(function(err){
				res.negotiate(err);
			});
		})
		.fail(function(err){
			res.negotiate(err);
		});
	}

};