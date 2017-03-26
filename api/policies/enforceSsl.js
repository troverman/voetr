module.exports = function(req, res, next) {
	//'use strict';

	/*var app = express();
	app.get('*',function(req,res,next){
	  if(req.headers['x-forwarded-proto']!='https')
	    res.redirect('https://mypreferreddomain.com'+req.url)
	  else
	    next() /* Continue to other routes if we're not redirecting */
	//})*/


	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		/*res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));*/
		res.redirect('https://www.google.com')
	} 
	else {
		next();
	}
};