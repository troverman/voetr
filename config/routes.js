/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'get /': {
    controller: 'HomeController',
    action: 'index'
  },

  'get /about': 'HomeController.index',
  'get /blog': 'HomeController.index',
  'get /blog/:id': 'HomeController.index',

  'get /committees': 'HomeController.index',
  'get /committee/:id': 'HomeController.index',
  'get /committee/:id/bill/:billId': 'HomeController.index',


  'get /member': 'HomeController.index',
  'get /member/:id': 'HomeController.index',


  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',


  /**
   * User routes
   */
  'get /api/user': 'UserController.getAll',
  'get /api/user/:id': 'UserController.getOne',
  'post /api/user': 'UserController.create',

  /**
   * Post routes
   */
  'get /api/post': 'PostController.getAll',
  'get /api/post/:id': 'PostController.getOne',
  'post /api/post': 'PostController.create',
  'delete /api/post/:id': 'PostController.destroy',

  /**
   * Bill routes
   */
  'get /api/bill': 'CommitteeBillController.getAll',
  'get /api/bill/:id': 'CommitteeBillController.getOne',
  'post /api/bill': 'CommitteeBillController.create',
  'delete /api/bill/:id': 'CommitteeBillController.destroy',

  /**
   * Committee routes
   */
  'get /api/committee': 'CommitteeController.getAll',
  'get /api/committee/:id': 'CommitteeController.getOne',
  'post /api/committee': 'CommitteeController.create',
  'delete /api/committee/:id': 'CommitteeController.destroy',

  /**
   * CommitteeVote routes
   */
  'get /api/committeevote': 'CommitteeVoteController.getAll',
  'get /api/committeevote/:id': 'CommitteeVoteController.getOne',
  'post /api/committeevote': 'CommitteeVoteController.create',
  'delete /api/committeevote/:id': 'CommitteeVoteController.destroy',


  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
