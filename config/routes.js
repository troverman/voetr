/**
 * Route Mappings
 * (sails.config.routes)
 */

module.exports.routes = {

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
  'get /member/:path': 'HomeController.index',
  'get /member/:path/bills': 'HomeController.index',
  'get /member/:path/committees': 'HomeController.index',
  'get /member/:path/constituents': 'HomeController.index',
  'get /member/:path/representatives': 'HomeController.index',
  'get /member/:path/votes': 'HomeController.index',

  'get /search': 'HomeController.index',
  'get /search/:searchQuery': 'HomeController.index',
  'get /votes': 'HomeController.index',
  'get /vote/:id': 'HomeController.index',

  'get /login': 'HomeController.index',
  'get /register': 'HomeController.index',
  'get /logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',
  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'delete /auth/providers/:provider': 'UserController.removePassport',

  /**
   * Bill routes
   */
  'get /api/bill': 'BillController.getSome',
  'get /api/bill/count': 'BillController.getCount',
  'get /api/bill/committee': 'BillController.getByCommittee',
  'get /api/bill/:id': 'BillController.getOne',
  'post /api/bill': 'BillController.create',
  'delete /api/bill/:id': 'BillController.destroy',

  /**
   * BillVote routes
   */
  'get /api/billvote/bill': 'BillVoteController.getByBill',
  'get /api/billvote/user': 'BillVoteController.getByUser',
  'post /api/billvote': 'BillVoteController.create',
  'delete /api/billvote/:id': 'BillVoteController.destroy',

  /**
   * Committee routes
   */
  'get /api/committee': 'CommitteeController.getSome',
  'get /api/committee/count': 'CommitteeController.getCount',
  'get /api/committee/:id': 'CommitteeController.getOne',
  'get /api/committee/children/:id': 'CommitteeController.getChildren',
  'get /api/committee/url/:path': 'CommitteeController.getByUrl',
  'post /api/committee': 'CommitteeController.create',
  'delete /api/committee/:id': 'CommitteeController.destroy',

   /**
   * CommitteeMember routes
   */
  'get /api/committeemember': 'CommitteeMemberController.getSome',
  'get /api/committeemember/count': 'CommitteeMemberController.getCommitteeMemberCount',
  'post /api/committeemember': 'CommitteeMemberController.create',
  'delete /api/committeemember/:id': 'CommitteeMemberController.destroy',

  /**
   * CommitteeVote routes
   */
  /*
  'get /api/committeevote/:id': 'CommitteeVoteController.getOne',
  'post /api/committeevote': 'CommitteeVoteController.create',
  'delete /api/committeevote/:id': 'CommitteeVoteController.destroy',
   */

  /**
   * Follower routes
   */
  'get /api/follower/:id': 'FollowerController.getOne',
  'get /api/follower/followers/:id': 'FollowerController.getFollowers',
  'get /api/follower/following/:id': 'FollowerController.getFollowing',
  'post /api/follower': 'FollowerController.create',
  'delete /api/follower/:id': 'FollowerController.destroy',

  /**
   * Post routes
   */
  'get /api/post': 'PostController.getSome',
  'get /api/post/:id': 'PostController.getOne',
  'get /api/post/filter/bill': 'PostController.getByBill',
  'get /api/post/filter/committee': 'PostController.getByCommittee',
  'get /api/post/filter/profile': 'PostController.getByProfile',
  'get /api/post/filter/user': 'PostController.getByUser',
  'get /api/post/filter/vote': 'PostController.getByVote',
  'post /api/post': 'PostController.create',
  'delete /api/post/:id': 'PostController.destroy',
  'post /api/post/:id': 'PostController.update',

  /**
   * Representative routes
   */
  'get /api/representative/location': 'RepresentativeController.getByLocation',
  'get /api/representative/:id': 'RepresentativeController.getOne',
  'get /api/representative/constituents/:id': 'RepresentativeController.getConstituents',
  'get /api/representative/representatives/:id': 'RepresentativeController.getRepresentatives',
  'get /api/representative/user/constituent/count/:id': 'RepresentativeController.getConstituentCount',
  'get /api/representative/user/representative/count/:id': 'RepresentativeController.getRepresentativeCount',

  'post /api/representative': 'RepresentativeController.create',
  'delete /api/representative/:id': 'RepresentativeController.destroy',

  /**
   * Search routes
   */
  'get /api/search/:searchQuery': 'SearchController.search',

  /**
   * User routes
   */
  'get /api/user': 'UserController.getSome',
  'get /api/user/count': 'UserController.getCount',
  'get /api/user/me': 'UserController.getMine',
  'get /api/user/:id': 'UserController.getOne',
  'get /api/user/username/:path': 'UserController.getByUsername',
  'post /api/user': 'UserController.create',
  'post /api/user/upload': 'UserController.upload',
  'post /api/user/:id': 'UserController.update',

  /**
   * Vote routes
   */
  'get /api/vote': 'VoteController.getSome',
  'get /api/vote/:id': 'VoteController.getOne',
  'get /api/vote/bill/:id': 'VoteController.getByBill',
  'post /api/vote': 'VoteController.create',
  'delete /api/vote/:id': 'VoteController.destroy',

  /**
   * voteVote routes
   */
  'get /api/votevote/bill': 'VoteVoteController.getByBill',
  'get /api/votevote/user': 'VoteVoteController.getByUser',
  'get /api/votevote/vote': 'VoteVoteController.getByVote',
  'get /api/votevote/:id': 'VoteVoteController.getOne',
  'get /api/votevote/user/count/:id': 'VoteVoteController.getUserCount',
  'post /api/votevote': 'VoteVoteController.create',
  'delete /api/votevote/:id': 'VoteVoteController.destroy',

  '/.well-known/acme-challenge/26yeRHjK-mgWP_Uz4bZP6OsQ-fslBu14HN9WCkfu5zo': 'NewDataController.ssl',

  'get /*': {
    controller: "HomeController",
    action: "index",
    skipAssets: true
  }

  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
