module.exports = function(req, response, next) {
	'use strict';
	if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
		return response.redirect([
			'https://',
			req.host,
			req.url
		].join(''));
	} else {
		next();
	}
};