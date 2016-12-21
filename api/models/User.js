module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        avatarUrl: {
            type: 'string',
            defaultsTo: 'images/avatar.png'

        },
        coverUrl: {
            type: 'string',
        },
        following: {
            type: 'string',
        },
        followers: {
            type: 'string',
        },
        first_name: {
            type: 'string',
            required: true
        },
        last_name: {
            type: 'string',
        },
        middleName: {
            type: 'string',
        },
        dateOfBirth: {
            type: 'string',
        },
        stateOfBirth: {
            type: 'string',
        },
        driversLicenseNumber: {
            type: 'string',
        },
        socialSecurityNumber: {
            type: 'string',
        },
        identificationUrl: {
            type: 'string',
        },
        isVerified: {
            type: 'boolean',
            defaultsTo: false
        },
        socialMedia: {
            type: 'json',
        },
        party: {
            type: 'string',
        },
        state: {
            type: 'json',
        },
        term_end: {
            type: 'string',
        },
        term_start: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        committees: {
            collection: 'committeemember',
            via: 'user'
        },
        bioguide_id:{
            type: 'string'
        },
        passports: {
          collection: 'Passport',
          via: 'user'
        },
        passwordResetToken: {
            type: 'string'
        },
        resetTokenExpiresAfter: {
            type: 'integer'
        }
    },

    afterCreate: function(model,next){

        var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg', 'images/bokeh.jpg', 'images/metro.jpg', 'images/brasil.jpg', 'images/natural.jpg' ,'images/nature.jpg']
        var randInt = Math.floor(Math.random() * (coverUrlArray.length + 1));
        model.coverUrl = coverUrlArray[randInt];

        User.update({id: model.id}, model)
        .then(function(model){
            //User.publishUpdate(id, model);
            //res.json(model);
            return next(null, model);
        });
        
        //emailService.sendTemplate('welcome', model.email, 'Welcome To Bidio!', {username: model.username});
    },

    getAll: function() {
        return User.find()
        .then(function (models) {
            return [models];
        });
    },

    getSome: function(limiting, skipping) {
        return User.find()
        .limit(limiting)
        .skip(skipping)
        .then(function (models) {
            return models;
        });
    },

    getOne: function(id) {
        return User.findOne(id)
        .then(function (model) {
            return [model];
        });
    }
};