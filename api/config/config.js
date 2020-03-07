module.exports = {
	blueprints :{},
	bootstrap: async function(cb) {
		initApp.init();
		cb();
	},
	//TODO: REMOVE
	datastores: {
	    'default': {
		    adapter: 'sails-mongo',
		    url: 'mongodb://heroku_qwh3gxcb:ec3savcns5imio3gscvoakuoj8@ds135489-a0.mlab.com:35489,ds135489-a1.mlab.com:35489/heroku_qwh3gxcb?replicaSet=rs-ds135489'
	 	},
	},
	globals: {
	   _: require('lodash'),
	   async: require('async'),
	   models: true,
	   services: true,
	   sails: true,
	},
	http: {
		middleware: {
			prerender: require('prerender-node').set('prerenderServiceUrl', 'https://tranquil-reef-73037.herokuapp.com/').set('prerenderToken', 'V8W4l4iLL7BRD4pB8stg'),
			order: [
				'cookieParser',
				'session',
				'bodyParser',
				'prerender',
				'compress',
				'poweredBy',
				'$custom',
				'router',
				'www',
				'favicon',
			],
		}
	},
	i18n: {},
	log: {},
	//REDUCE GLOBAL MODEL DEFINITIONS 
	//APPCECIFIC INHERITANCE 
	//META MODEL APP . . .
	models: {
		fetchRecordsOnUpdate: true,
		fetchRecordsOnCreate: true,
		fetchRecordsOnCreateEach: true,
		migrate: 'safe',
		datastore: 'default',
		attributes: {
			createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
			updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true, },
			id: { type: 'string', columnName: '_id' }
		},
		dataEncryptionKeys: {default: 'V7TZVUpF5WLGg2c2eRVaSx0p3/4Ef11ZujTaY4EVdpY='},
	},
	passport: {
		local: {strategy: require('passport-local').Strategy},
		//bearer: {strategy: require('passport-http-bearer').Strategy},
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
				profileFields: ['id', 'emails', 'name', 'displayName'],// 'public_profile'],
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
	},
	policies:{
		'*': true,
		'*': ['passport'],
		//gotta do the policy that can only create -- update with an id that is your session -- oh that's not coming from the frontend -- okay
		//may want to switch to beare auth.... hmm
		/*
		BillController: {
			create: ['sessionAuth'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		CommitteeController: {
			create: ['sessionAuth'],
			update: ['sessionAuth', 'isRecordOwner'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		CommitteeMemberController: {
			create: ['sessionAuth'],
			update: ['sessionAuth', 'isRecordOwner'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		FollowerController: {
			create: ['sessionAuth'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		PostController: {
			create: ['sessionAuth'],
			update: ['sessionAuth', 'isRecordOwner'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		RepresentativeController: {
			create: ['sessionAuth'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		*/
		UserController: {
			update: ['sessionAuth', 'isRecordOwner'],
			upload: ['sessionAuth', 'isRecordOwner'],
			removePassport: ['sessionAuth', 'isRecordOwner'],
		},
		/*
		VoteController: {
			create: ['sessionAuth'],
			update: ['sessionAuth', 'isRecordOwner'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},

		VoteVoteController: {
			create: ['sessionAuth'],
			update: ['sessionAuth', 'isRecordOwner'],
			destroy: ['sessionAuth', 'isRecordOwner'],
		},
		*/
	},
	routes:{

		//DYNAMIC DEFINED BY PEER :)
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

		'get /post/:id': 'HomeController.index',
		'get /search': 'HomeController.index',
		'get /search/:searchQuery': 'HomeController.index',
		'get /votes': 'HomeController.index',
		'get /vote/:id': 'HomeController.index',
		'get /votevote/:id': 'HomeController.index',

		'get /login': 'HomeController.index',
		'get /register': 'HomeController.index',
		'get /logout': 'AuthController.logout',

		'post /auth/local': 'AuthController.callback',
		'post /auth/local/:action': 'AuthController.callback',
		'get /auth/:provider': 'AuthController.provider',
		'get /auth/:provider/callback': 'AuthController.callback',
		'delete /auth/providers/:provider': 'UserController.removePassport',

		'get /api/bill': 'BillController.getSome',
		'get /api/bill/count': 'BillController.getCount',
		'get /api/bill/committee': 'BillController.getByCommittee',
		'get /api/bill/:id': 'BillController.getOne',
		'post /api/bill': 'BillController.create',
		'delete /api/bill/:id': 'BillController.destroy',

		'get /api/billvote/bill': 'BillVoteController.getByBill',
		'get /api/billvote/user': 'BillVoteController.getByUser',
		'post /api/billvote': 'BillVoteController.create',
		'delete /api/billvote/:id': 'BillVoteController.destroy',

		'get /api/committee': 'CommitteeController.getSome',
		'get /api/committee/count': 'CommitteeController.getCount',
		'get /api/committee/:id': 'CommitteeController.getOne',
		'get /api/committee/children/:id': 'CommitteeController.getChildren',
		'get /api/committee/url/:path': 'CommitteeController.getByUrl',
		'post /api/committee': 'CommitteeController.create',
		'delete /api/committee/:id': 'CommitteeController.destroy',

		'get /api/committeebill': 'CommitteeBillController.getSome',
		'get /api/committeebill/children': 'CommitteeBillController.getByCommiteeAndChildren',
		'post /api/committeebill': 'CommitteeBillController.create',
		'delete /api/committeebill/:id': 'CommitteeBillController.destroy',

		'get /api/committeemember': 'CommitteeMemberController.getSome',
		'get /api/committeemember/count': 'CommitteeMemberController.getCommitteeMemberCount',
		'post /api/committeemember': 'CommitteeMemberController.create',
		'delete /api/committeemember/:id': 'CommitteeMemberController.destroy',

		/*
		'get /api/committeevote/:id': 'CommitteeVoteController.getOne',
		'post /api/committeevote': 'CommitteeVoteController.create',
		'delete /api/committeevote/:id': 'CommitteeVoteController.destroy',
		*/

		'get /api/follower/:id': 'FollowerController.getOne',
		'get /api/follower/followers/:id': 'FollowerController.getFollowers',
		'get /api/follower/following/:id': 'FollowerController.getFollowing',
		'post /api/follower': 'FollowerController.create',
		'delete /api/follower/:id': 'FollowerController.destroy',

		'get /api/post': 'PostController.getSome',
		'get /api/post/:id': 'PostController.getOne',
		'get /api/post/filter/bill': 'PostController.getByBill',
		'get /api/post/filter/committee': 'PostController.getByCommittee',
		'get /api/post/filter/post': 'PostController.getByPost',
		'get /api/post/filter/profile': 'PostController.getByProfile',
		'get /api/post/filter/user': 'PostController.getByUser',
		'get /api/post/filter/vote': 'PostController.getByVote',
		'post /api/post': 'PostController.create',
		'delete /api/post': 'PostController.destroy',
		'post /api/post/:id': 'PostController.update',

		'post /api/reaction': 'ReactionController.create',
		'delete /api/reaction/:id': 'ReactionController.destroy',

		'get /api/representative/location': 'RepresentativeController.getByLocation',
		'get /api/representative/:id': 'RepresentativeController.getOne',
		'get /api/representative/constituents/:id': 'RepresentativeController.getConstituents',
		'get /api/representative/representatives/:id': 'RepresentativeController.getRepresentatives',
		'get /api/representative/user/constituent/count/:id': 'RepresentativeController.getConstituentCount',
		'get /api/representative/user/representative/count/:id': 'RepresentativeController.getRepresentativeCount',
		'post /api/representative': 'RepresentativeController.create',
		'delete /api/representative/:id': 'RepresentativeController.destroy',

		'get /api/search/committeeActivity': 'SearchController.getMemberActivity',
		'get /api/search/billActivity': 'SearchController.getMemberActivity',
		'get /api/search/memberActivity': 'SearchController.getMemberActivity',
		'get /api/search/voteActivity': 'SearchController.getMemberActivity',
		'get /api/search/:searchQuery': 'SearchController.search',
		'get /api/trending': 'SearchController.getTrending',

		'get /api/user': 'UserController.getSome',
		'get /api/user/count': 'UserController.getCount',
		'get /api/user/me': 'UserController.getMine',
		'get /api/user/:id': 'UserController.getOne',
		'get /api/user/username/:path': 'UserController.getByUsername',
		'post /api/user': 'UserController.create',
		'post /api/user/upload': 'UserController.upload',
		'post /api/user/:id': 'UserController.update',

		'get /api/vote': 'VoteController.getSome',
		'get /api/vote/activity': 'VoteController.getActivity',
		'get /api/vote/:id': 'VoteController.getOne',
		'get /api/vote/bill/:id': 'VoteController.getByBill',
		'post /api/vote': 'VoteController.create',
		'delete /api/vote/:id': 'VoteController.destroy',

		'get /api/votevote/bill': 'VoteVoteController.getByBill',
		'get /api/votevote/user': 'VoteVoteController.getByUser',
		'get /api/votevote/vote': 'VoteVoteController.getByVote',
		'get /api/votevote/:id': 'VoteVoteController.getOne',
		'get /api/votevote/user/count/:id': 'VoteVoteController.getUserCount',
		'post /api/votevote': 'VoteVoteController.create',
		'delete /api/votevote/:id': 'VoteVoteController.destroy',
		'/.well-known/acme-challenge/PFwzk8k9wB3DDslnHqLpAB50iHpzCYvMqo4IFUI4Pbo': 'NewDataController.ssl',

		'get /*': {
			controller: "HomeController",
			action: "index",
			skipAssets: true
		}
	},
	security:{
		cors:{
			allRoutes: true,
			allowOrigins: '*'
		}
	},
	session:{
		secret: 'cb5b21a569493ca31834e3827c09b4ed',
		// cookie: {
		//   maxAge: 24 * 60 * 60 * 1000
		// },
		// adapter: 'redis',
		// host: 'localhost',
		// port: 6379,
		// ttl: <redis session TTL in seconds>,
		// db: 0,
		// pass: <redis auth password>,
		// prefix: 'sess:',
		// adapter: 'mongo',
		// host: 'localhost',
		// port: 27017,
		// db: 'sails',
		// collection: 'sessions',
	},
	//TODO:NETWORKING ..
	//TODO: SHARE SOCKETS AMONST PEERS
	sockets:{
		// adapter: 'memory',
		// adapter: 'redis',
		// host: '127.0.0.1',
		// port: 6379,
		// db: 'sails',
		// pass: '<redis auth password>'
		beforeConnect: function(handshake, cb) {
			//console.log(session);
			//User.getSession.then(function(session){})
			//console.log(sails.session.User)
			return cb(null, true);
		},
		afterDisconnect: function(session, socket, cb) {
			//console.log(session.user)
			//if (session.User){
			//console.log(session.User.id);
			//}
			return cb();
		}
	},
	views:{
		extension: 'ejs',
		layout: 'layout',
		partials: false
	}
};