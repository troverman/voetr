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
        phone: {
            type: 'string',
        },
        posts: {
            collection: 'post',
            via: 'user'
        },
        committees: {
            collection: 'committeemember',
            via: 'user'
        },
        bioguide_id:{
            type: 'string'
        },
        passports : { collection: 'Passport', via: 'user' }
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