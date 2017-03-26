module.exports = function(req, res, next) {
	'use strict';
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		return res.redirect([
			'https://',
			req.get('Host'),
			req.url
		].join(''));
	} else {
		next();
	}
};