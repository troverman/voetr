/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  //bearer: {
  //  strategy: require('passport-http-bearer').Strategy
  //},

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'LstdoMQkR45IUvPCTHt6Yz4uV',
      consumerSecret: 'jbngETt2YOBewhMtbJyDGqQ0BEmW89wjb4h3A7PgekTQEbvxaj'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '396532397104248',
      clientSecret: 'b9a7a7f3c8fdd25f24b5a32ce8498479',
      profileFields: ['id', 'emails', 'name', 'displayName', 'public_profile'],
      //scope: ['displayName', 'email', 'link', 'picture.type(small)', 'public_profile', 'user_friends']
      scope: ['email','public_profile']
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: '1078553088164-da8dm09ac56ievupvji46ko5hls1skua.apps.googleusercontent.com',
      clientSecret: 'ORAKwERo6wWuIt2PlDBu4APz',
      scope: ['email']
    }
  }
};
