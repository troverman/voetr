module.exports = function(req, res, next) {
	next();
    //if (req.secure) {
        // Already https; don't do anything special.
    //    next();
    //} else {
        // Redirect to https.
    //    res.redirect('https://' + req.headers.host + req.url);
    //}
};