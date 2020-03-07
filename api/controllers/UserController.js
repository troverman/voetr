module.exports = {
	get: async function(req, res) {
		var limit = req.query.limit || 1;
		var skip = req.query.skip || 0;
		var sort = req.query.sort || 'createdAt DESC';
		var query = {};
		if (req.query.id){query={id:req.query.id}}
		if (req.query.path){query={username:req.query.path}}
		if (req.query.filter){query = JSON.parse(JSON.stringify(req.query.filter))}
		var models = await User.find(query).limit(limit).skip(skip).sort(sort);
		res.json(models);
	},
	//SECURE PASSPORTS..
	getMine: function(req,res){
		if (req.user){
			var me = req.user.id;
			User.findOne(me)
			.populate('passports')
			.then(function(user){return res.json(user);})
			.catch(function(err){return res.negotiate(err);});
		}
		else{return res.json();}
	},
	getCount: async function(req, res) {
		var userCount = await User.count();
		res.json({ userCount: userCount });
	},
	create: async function (req, res) {
		var model = {username: req.param('username'), email: req.param('email'), firstName: req.param('firstName'), avatarUrl: req.param('avatarUrl')};
		var model = await User.create(model)
		User.publishCreate(model.toJSON());
		res.json(model);	
	},
	update: async function(req,res){
		var id = req.session.user.id
		var model = {
			email: req.param('email'),
			firstName : req.param('firstName'),
			lastName : req.param('lastName'),
			username : req.param('username'),
			avatarUrl: req.param('avatarUrl'),
			coverUrl: req.param('coverUrl'),
			identificationUrl: req.param('identificationUrl'),
			address: req.param('address'),
		};
		var model = await User.update({id: id}, model);
		User.publishUpdate(id, model);
		res.json(model);
	},
	//TODO: S3 APP
	upload: function(req,res){
		res.setTimeout(0)
		var options = {adapter: require("skipper-s3"), key: 'AKIAJWRI5PIDP5OGKGLQ', secret: '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', bucket: 'voetr'};
		var byteCount = req.file('picture')._files[0].stream.byteCount
		req.file('picture')
		.on('progress', function (event){
			var percentageUploaded = event.written/byteCount;
			console.log(percentageUploaded);
		})
		.upload(options, function response(err,uploadedFiles){
			console.log('we are in the code')
			if (err) {return res.negotiate(err);}
		    if (uploadedFiles.length === 0){return res.badRequest('No file was uploaded');}
		    console.log(uploadedFiles);
		    var amazonUrl = uploadedFiles[0].extra.Location;
		    return res.json({amazonUrl: amazonUrl});
		});
	},
	removePassport: async function(req,res){
		var id = req.session.user.id;
		var provider = req.param("provider");
		var passport = await Passport.destroy({user: id, provider: provider});
		var model = await User.find({id:id});
		model.socialAccounts[(passport[0].provider).toString()] = {};
		await User.update({id:id}, model);
		res.json(passport);
	},
	reset: async function(req,res){
		var token = req.param("token");
		var newPassword = req.param("password");
		var user = await User.find({passwordResetToken: token, resetTokenExpiresAfter: {">": Date.now() }}).populate("passports")
		if (!user.length){req.flash("error", "Reset token is invalid or expired"); res.redirect("/reset/" + token);}
		/*shouldnt have to throw an error here but make sure only users who have
		local auth setup can get here*/
		var localPassport = user[0].passports.filter(function(passport){return passport.protocol == "local";})[0];
		var updatedPassport = await Passport.update({id: localPassport.id}, {password: newPassword})
		return res.redirect("/reset-success");
	}
};