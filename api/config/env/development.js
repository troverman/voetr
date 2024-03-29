/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

	mailgun: {
    key: 'key-b93391fa17454dc097c7b8418ff0c862',
		domain: 'mail.voetr.com'
	},

  hookTimeout: 10000000,
  
  policies: {
    '*': ['enforceSsl', 'passport']
  }


};
