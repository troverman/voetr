module.exports = function(req, res, next) {
	if ((req.headers['x-forwarded-proto'] == 'https') && (process.env.NODE_ENV === 'production')) {
		return res.redirect([
			'https://',
			req.host,
			req.url
		].join(''));
		//res.json('https://www.google.com')
	} 
	else {next()}
};