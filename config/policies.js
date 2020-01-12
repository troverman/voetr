/**
 * Policy Mappings
 * (sails.config.policies)
 *
 */


module.exports.policies = {

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



};
