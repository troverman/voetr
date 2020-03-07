module.exports = function(req, res, next) {
  	var id = req.session.user.id;
  	User.find({id:id}).then(function(user){console.log(user);});
    return next();
};