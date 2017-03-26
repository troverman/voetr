module.exports = function(req, res, next) {
	//'use strict';
	/*var express = require('express'),
 	var app = express();
	app.get('*',function(req,res,next){
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));

	  else
	    next() /* Continue to other routes if we're not redirecting */
	//})*/


	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		/*res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));*/
		console.log(res)
		//res.status(301).redirect('https://www.google.com')
	} 
	else {
		next();
	}
};