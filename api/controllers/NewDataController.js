var request = require("request");

module.exports = {

	ssl: function(req, res){

		res.send('26yeRHjK-mgWP_Uz4bZP6OsQ-fslBu14HN9WCkfu5zo.yMz-EAV5agQah1zn-w6Aqp0JVzxv1jmSFH6dh5Ea9uI')

	},

	cities: function(req, res) {

		var url = "https://gist.githubusercontent.com/mayurah/5f4a6b18b1aa8c26910f/raw/8dd2b9486874d283141cad8cccc5916e48c75dcd/countriesToCities.json";

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {

		        var cityData = body;
		        sails.log("********CITY DATA********")

		        for (var key in cityData) {
				  if (cityData.hasOwnProperty(key)) {
				  	if(key == "United States"){

						//sails.log(key + " -> " + cityData[key]);

						var cityArray = cityData[key];
						console.log(cityArray.length)
		        		for (var key in cityArray) {

		        			var title = cityArray[key];
							var urlTitle = cityArray[key].replace(/ /g,"-").toLowerCase();

							var model = {
								title: title,
								urlTitle: urlTitle,
							};

							//console.log(title);
							Committee.findOrCreate({urlTitle: urlTitle},model).exec(function createCB(err, created){
								//if(!err){console.log(created);}
							});

						}
				  	}
				  }
				}

		    }
		});

	},
	
};