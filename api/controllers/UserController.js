module.exports = {
	getAll: function(req, res) {
		User.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getMine: function(req,res){

		var me = req.user.id;
		User.findOne(me)
		.populate('passports')
		.then(function(user){
			return res.json(user);
		})
		.catch(function(err){
			return res.negotiate(err);
		});

	},

	getSome: function(req, res) {
		var limit = req.param('limit');
		var skip = req.param('skip');
		User.getSome(limit, skip)
		.then(function(models) {
			User.watch(req);
			User.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
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

	getCount: function(req, res) {
		User.count()
		.exec(function(err, userCount) {
			if (err) {
				return console.log(err);
			}
			else{
				res.json({ userCount: userCount });
			}
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


	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name'),
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
		var id = req.param('id');
		var model = {
			//email: req.param('email'),
			firstName : req.param('firstName'),
			lastName : req.param('lastName'),
			//username : req.param('username'),
			avatarUrl: req.param('avatarUrl'),
			coverUrl: req.param('coverUrl'),
			identificationUrl: req.param('identificationUrl'),

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

	}



};