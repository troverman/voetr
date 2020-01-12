module.exports = {
	attributes: {
        reaction: {type: 'string', required: true},
        postModel: {model: 'post'},
        user: {model: 'user', required: true},
        voteVote:{model: 'votevote'},
    },
    beforeCreate: async function(model, next){
        //only one react per user per post or per votevote or bill or vote or committee member join
        var reactionModel = await Reaction.find({user: model.user, postModel:model.postModel})//, voteVote:model.voteVote})
        console.log(reactionModel)
        if (reactionModel.length == 0){return next(null, reactionModel);}
        else{
            if(reactionModel[0].reaction != model.reaction){  
                var updatedModel = await Reaction.update({id: reactionModel[0].id}, model)
                Reaction.publishUpdate(reactionModel[0].id, updatedModel);
            }
        }
    },
    afterCreate: async function(model, next){
        var reactionCount = await Reaction.count().where({postModel:model.postModel, reaction:model.reaction})
        console.log(reactionCount);
        var postUpdateModel = {};
        if (model.reaction == 'like'){postUpdateModel = {plusCount:reactionCount}}
        if (model.reaction == 'dislike'){postUpdateModel = {minusCount:reactionCount}}
        var postModel = await Post.update({id: model.postModel}, postUpdateModel)
        var post = Post.find({id:postModel[0].id});
        Post.publishUpdate(post[0].id, post[0]);
        return next(null, post);
    },
};

 