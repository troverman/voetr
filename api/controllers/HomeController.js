module.exports = {
    index: function(req, res) {
    	var path = req.route.path;
        
    	//sails.sockets.join(req, path, function(err) {
    	//	console.log(sails.sockets.subscribers(path))
    	//})
        //Viewer Model -- {path, user}
    	//Viewer.find({path:})-->add entires for logged in views etc??? to get live views // subscribers to socket methods. hm
        //could prob do a get call to a viewer function from main angular app.js ViewerController.getViews -- > 
        //send the current angular stateParams, subscribe to the that room

        res.view({
            currentUser: req.user
        });
    }
};