var App = {
	init: async function(){
		await emailService.loadTemplates();
		passport.loadStrategies();
		intervalService.init();
	 	cb();
	}
};
module.exports = App;