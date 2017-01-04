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



  'get /': 'HomeController.index',
  'get /account': 'HomeController.index',
  'get /about': 'HomeController.index',
  'get /blog': 'HomeController.index',
  'get /blog/:id': 'HomeController.index',
  'get /bills': 'HomeController.index',
  'get /bill/:id': 'HomeController.index',
  'get /bill/:id/:path': 'HomeController.index',

  'get /committees': 'HomeController.index',
  'get /committee/:path': 'HomeController.index',
  'get /committee/:path/bills': 'HomeController.index',
  'get /committee/:path/discussion': 'HomeController.index',
  'get /committee/:path/committees': 'HomeController.index',
  'get /committee/:path/members': 'HomeController.index',
  'get /committee/:path/votes': 'HomeController.index',
  
  'get /member': 'HomeController.index',
  'get /member/:id': 'HomeController.index',
  'get /search': 'HomeController.index',
  'get /search/:searchQuery': 'HomeController.index',
  'get /votes': 'HomeController.index',
  'get /vote/:id': 'HomeController.index',

  'get /login': 'HomeController.index',
  'get /register': 'HomeController.index',
  'get /logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  /**
   * Bill routes
   */
  'get /api/bill': 'BillController.getAll',
  'get /api/bill/count': 'BillController.getCount',
  'get /api/bill/:id': 'BillController.getOne',
  'get /api/bill/committee/:id/:limit/:skip/:sort': 'BillController.getSome',
  'get /api/bill/filter/:limit/:skip/:sort': 'BillController.getSome',
  'post /api/bill': 'BillController.create',
  'delete /api/bill/:id': 'BillController.destroy',

  /**
   * (bill) Vote routes
   */
  'get /api/vote': 'Vote.getAll',
  'get /api/vote/:id': 'Vote.getOne',
  'get /api/vote/bill/:id': 'Vote.getByBill',
  'get /api/vote/user/:id': 'Vote.getByUser',
  'post /api/vote': 'Vote.create',
  'delete /api/vote/:id': 'Vote.destroy',

  /**
   * Comment routes
   */
  'get /api/comment': 'Comment.getAll',
  'get /api/comment/:id': 'Comment.getOne',
  'get /api/comment/bill/:id': 'Comment.getByBill',
  'post /api/comment': 'Comment.create',
  'delete /api/comment/:id': 'Comment.destroy',

  /**
   * Committee routes
   */
  'get /api/committee': 'CommitteeController.getAll',
  'get /api/committee/count': 'CommitteeController.getCount',
  'get /api/committee/:id': 'CommitteeController.getOne',
  'get /api/committee/url/:path': 'CommitteeController.getByUrl',
  'get /api/committee/filter/:limit/:skip': 'CommitteeController.getSome',
  'post /api/committee': 'CommitteeController.create',
  'delete /api/committee/:id': 'CommitteeController.destroy',

   /**
   * CommitteeMember routes
   */
  'get /api/committeeMember/committee/:id': 'CommitteeMemberController.getByCommittee',
  'get /api/committeeMember/member/:id': 'CommitteeMemberController.getByMember',
  'post /api/committeeMember': 'CommitteeMemberController.create',
  'delete /api/committeeMember/:id': 'CommitteeMemberController.destroy',

  /**
   * CommitteeVote routes
   */
  'get /api/committeevote': 'CommitteeVoteController.getAll',
  'get /api/committeevote/:id': 'CommitteeVoteController.getOne',
  'post /api/committeevote': 'CommitteeVoteController.create',
  'delete /api/committeevote/:id': 'CommitteeVoteController.destroy',

  /**
   * Follower routes
   */
  'get /api/follower': 'FollowerController.getAll',
  'get /api/follower/:id': 'FollowerController.getOne',
  'get /api/follower/followers/:id': 'FollowerController.getFollowers',
  'get /api/follower/following/:id': 'FollowerController.getFollowing',
  'post /api/follower': 'FollowerController.create',
  'delete /api/follower/:id': 'FollowerController.destroy',

  /**
   * Representative routes
   */
  'get /api/representative': 'RepresentativeController.getAll',
  'get /api/representative/:id': 'RepresentativeController.getOne',
  'get /api/representative/constituents/:id': 'RepresentativeController.getConstituents',
  'get /api/representative/representatives/:id': 'RepresentativeController.getRepresentatives',
  'post /api/representative': 'RepresentativeController.create',
  'delete /api/representative/:id': 'RepresentativeController.destroy',

  /**
   * Search routes
   */
  'get /api/search/:searchQuery': 'SearchController.search',

  /**
   * User routes
   */
  'get /api/user': 'UserController.getAll',
  'get /api/user/count': 'UserController.getCount',
  'get /api/user/me': 'UserController.getMine',
  'get /api/user/:id': 'UserController.getOne',
  'get /api/user/filter/:limit/:skip': 'UserController.getSome',
  'get /api/user/username/:path': 'UserController.getByUsername',
  'post /api/user': 'UserController.create',
  'post /api/user/upload': 'UserController.upload',
  'post /api/user/:id': 'UserController.update',

  /**
   * Vote routes
   */
  'get /api/vote': 'VoteController.getAll',
  'get /api/vote/:id': 'VoteController.getOne',
  'get /api/vote/bill/:id': 'VoteController.getByBill',
  'get /api/vote/committee/:id': 'VoteController.getByCommittee',
  'get /api/vote/filter/:limit/:skip/:sort': 'VoteController.getSome',
  'post /api/vote': 'VoteController.create',
  'delete /api/vote/:id': 'VoteController.destroy',

  /**
   * voteVote routes
   */
  'get /api/votevote': 'VoteVoteController.getAll',
  'get /api/votevote/:id': 'VoteVoteController.getOne',
  'get /api/votevote/bill/:id': 'VoteVoteController.getByBill',
  'get /api/votevote/user/count/:id': 'VoteVoteController.getUserCount',
  'get /api/votevote/user/:id/:limit/:skip/:sort': 'VoteVoteController.getByUser',

  'get /api/votevote/vote/:id': 'VoteVoteController.getByVote',
  'post /api/votevote': 'VoteVoteController.create',
  'delete /api/votevote/:id': 'VoteVoteController.destroy',


  'get /*': {
    controller: "HomeController",
    action: "index",
    skipAssets: true
  }

  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
