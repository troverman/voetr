module.exports = function(req, res, next) {
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		/*res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));*/
		//console.log(res)
		console.log(req.headers['x-forwarded-proto'])
		res.json('https://www.google.com')
	} 
	else {
		next();
	}
};