/**
* Reaction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        reaction: {
            type: 'string',
            required: true
        },
        postModel: {
            model: 'post',
        },
        user: {
            model: 'user',
            required: true
        },
        voteVote:{
            model: 'votevote',
        },
    },

    beforeCreate: function(model, next){
        //only one react per user per post or per votevote or bill or vote or committee member join
        Reaction.find({user: model.user, postModel:model.postModel, voteVote:model.voteVote})
        .then(function(reactionModel){
            if (reactionModel.length == 0){
                return next(null, reactionModel);
            }
            else{
                if(reactionModel[0].reaction != model.reaction){  
                    Reaction.update({id: reactionModel[0].id}, model)
                    .then(function(model){
                        Reaction.publishUpdate(reactionModel[0].id, model);
                    });
                }
            }
        });
    },

    afterCreate: function(model, next){

        Reaction.count()
        .where({postModel:model.postModel, reaction:model.reaction})
        .then(function(reactionCount){
            console.log(reactionCount);
            var postUpdateModel = {};
            if (model.reaction == 'like'){
                postUpdateModel = {plusCount:reactionCount}
            }
            if (model.reaction == 'dislike'){
                postUpdateModel = {minusCount:reactionCount}
            }
            Post.update({id: model.postModel}, postUpdateModel)
            .then(function(model){
                Post.getOne(model[0].id).then(function(postModel){
                    Post.publishUpdate(postModel[0].id, postModel[0]);
                });
            });
        });

        return next(null, model);

    },
    
};

 