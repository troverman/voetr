module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        avatarUrl: {
            type: 'string',
            defaultsTo: 'images/avatar.png'
        },
        coverUrl: {
            type: 'string',
            defaultsTo: 'images/congress.png',
        },
        following: {
            type: 'string',
        },
        followers: {
            type: 'string',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
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
        isOfficial: {
            type: 'boolean',
            defaultsTo: false
        },
        isVerified: {
            type: 'boolean',
            defaultsTo: false
        },
        socialAccounts: {
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
        fax: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        district: {
            type: 'string',
        },
        //bills: {
        //    collection: 'bill',
        //    via: 'user'
        //},
        bills: {
            collection: 'billmember',
            via: 'user'
        },
        committees: {
            collection: 'committeemember',
            via: 'user'
        },
        bioguide_id:{
            type: 'string'
        },
        leg_id:{
            type: 'string'
        },
        representatives: {
            collection: 'representative',
            via: 'constituent'
        },
        constituents: {
            collection: 'representative',
            via: 'representative'
        },
        committeeCount: {
            type: 'integer',
            defaultsTo: 0
        },
        constituentCount: {
            type: 'integer',
            defaultsTo: 0
        },
        representativeCount: {
            type: 'integer',
            defaultsTo: 0
        },
        voteCount: {
            type: 'integer',
            defaultsTo: 0
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

        var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg', 'images/bokeh.jpg', 'images/metro.jpg', 'images/natural.jpg' ,'images/nature.jpg'];
        var randInt = Math.floor(Math.random() * (coverUrlArray.length + 1));
        model.coverUrl = coverUrlArray[randInt];
        User.update({id: model.id}, model)
        .then(function(model){
            emailService.sendTemplate('welcome', model.email, 'Welcome To Voetr!', {username: model.username});
            return next(null, model);
        });

    },

    getOne: function(id) {
        return User.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

    getSome: function(limiting, skipping, sort) {
        return User.find()
        .sort(sort)
        .limit(limiting)
        .skip(skipping)
        .then(function (models) {
            return models;
        });
    },

};