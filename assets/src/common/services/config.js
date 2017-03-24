angular.module( 'services.config', ['lodash'])
.service('config',['lodash', function(lodash) {
	return {
		siteName: 'voetr',
		siteUrl: '/',
		apiUrl: '/api',
		currentUser: false
	};
}]);