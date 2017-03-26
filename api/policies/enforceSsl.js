module.exports = function(req, res, next) {
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		/*res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));*/
		console.log(res)
		res.status(301).redirect('https://www.google.com')
	} 
	else {
		next();
	}
};