module.exports = function(req, res, next) {
	console.log(req)
	'use strict';
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		return res.redirect(301, [
			'https://',
			req.Host,
			req.url
		].join(''));
	} else {
		next();
	}
};