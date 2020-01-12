const rp = require('request-promise');
const openCongressApiKey = 'f6907ad0-1af4-4656-add7-657931b439ef';
const propublicaApiKey = 'hkxQrlrF0ba6dZdSxJMIC4B60JxKMtmm8GR5YuRx';

//TODO: REGISTERY OF CONSTANTS APP
	//VOTE BY VALIDATION MAPS AND SUCH
const states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

//TODO: VOETR APP
//TODO: OPEN FINANCE RE PROJECTS ~ 
	//MAP APPROPIATE CONNECTIONS FOR VOTE-VOTES

module.exports = {

	//SOURCE: GITHUB GIST . . 
	cityCommittees: async function(){
		var model = {
			url: 'https://gist.githubusercontent.com/mayurah/5f4a6b18b1aa8c26910f/raw/8dd2b9486874d283141cad8cccc5916e48c75dcd/countriesToCities.json',
			json: true,
		};
		var body = await rp(model);
        var cityData = body;
        for (x in cityData) {
			if (cityData.hasOwnProperty(key)) {
		  		if(key == "United States"){
					var cityArray = cityData[x];
	        		for (y in cityArray) {
	        			var title = cityArray[y];
						var urlTitle = cityArray[y].replace(/ /g,"-").toLowerCase();
						var model = { title: title, urlTitle: urlTitle};
						var newCommittee = await Committee.findOrCreate({urlTitle: urlTitle}, model);
					}
		  		}
		  	}
		}
	},

	//TODO: WIP
	//GOOGLE CIVIC INFO API!
	//TODO: APP
	getLegislatorsNew: async function(lat, lng){
		var model = {
			url: 'https://www.googleapis.com/civicinfo/v2/representatives/?key=AIzaSyDuNNenJANprqe8vwdk_v6wuN38EEUkJPs&address='+req.query.lat+','+req.query.lng+'&roles=legislatorlowerbody&roles=legislatorupperbody',
			json: true,
		};
		var modelArray = [];
		var body = await rp(model);
		if(!error){
			console.log(body.officials);
			for (x in body.officials){
				//ID IS ALSO IN PIC URL..
				var first_name = body.officials[x].name.split(' ')[0];
				var last_name = body.officials[x].name.split(' ').slice(-1)[0];
				if (last_name.endsWith('.')){last_name = body.officials[x].name.split(' ')[body.officials[x].name.split(' ').length - 2] + ' ' + body.officials[x].name.split(' ').slice(-1)[0]}
				var model = {first_name:first_name, last_name:last_name};
				console.log(first_name, last_name);
				modelArray.push(model)
			}
			var models = await Legislator.find(modelArray);
		}
	},

	//TODO: REPLACE WITH PROPUBLICA GET LEGISLATORS
	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	getLegislators: async function(lat, lng){
		var lat = req.param('lat');
		var lng = req.param('lng');
		var stateModel= {
			url: 'http://openstates.org/api/v1/legislators/geo/?lat='+lat+'&long='+lng+'&active=true&apikey='+openCongressApiKey,
			json: true
		};
		var federalModel = {
			url: 'http://congress.api.sunlightfoundation.com/legislators/locate?latitude='+lat+'&longitude='+lng+'&per_page=all&apikey='+propublicaApiKey,
			json: true
		};

		var stateRepresentatives = await rp(stateModel);
		var federalRepresentatives = await rp(federalModel);

		var federalRepresentatives = federalRepresentatives.results;

		var bioguide_id = federalRepresentatives.map(function(obj){return obj.bioguide_id});
		var leg_id = stateRepresentatives.map(function(obj){return obj.leg_id});

		var federalRepresentatives = await User.find({bioguide_id:bioguide_id});
		representatives.concat(federalRepresentatives);

		var stateRepresentatives = await User.find({leg_id:leg_id});
		var representatives = federalRepresentatives.concat(stateRepresentatives);

		res.json(representatives);
	},

	//TODO: GEONAMES APP
	//MODULARITY -- THIS IS GOENAMES + COMMITTEE
	getGeoNamesByParent: async function(geoNameParentId, parentId, username, nestLevel){
		//voetr1, voetr2, voetr3, voetr4, voetr5, troverman
		if (!nestLevel){var nestLevel=0}
		nestLevel++;
		var model = {url:'http://api.geonames.org/childrenJSON?geonameId='+geoNameParentId+'&username='+username+'&maxRows=1000000', json: true};

		var body = await rp(model);
		if (body){
			var nameData = body.geonames;
			for (x in nameData){
				var committeeData = nameData[x];
				if (committeeData.fcl=='A' || committeeData.fcode=='PPLA' || committeeData.fcode=='PPLA2' || committeeData.fcode=='PPLA3'){
					var countryName = committeeData.countryName;
					var fcl = committeeData.fcl;
					var fcode =  committeeData.fcode;
					var geonameId = committeeData.geonameId;
					var lat = committeeData.lat;
					var lng = committeeData.lng;
					var title = committeeData.name;
					var urlTitle = title.replace(/ /g,"-").replace(/\./g,'').replace(/[()]/g, '').toLowerCase();
					//console.log(committeeData.fcl)
					//console.log(committeeData.fcode)
					//console.log(committeeData.countryName)
					//console.log(urlTitle)
					var model = {
						//fcl: fcl,
						//fcode: fcode,
						isOfficial: true,
						geonameId: geonameId,
						lat: lat,
						lng: lng,
						parent: parentId,
						title: title,
						urlTitle: urlTitle
					};

					//console.log(model)
					//messes up with modified urlTitles... aka georgia or repeated dup county names. --> lat lng?  
					//lol gotta update legacy state lat: lng..
					var committeeModel = await Committee.find({lat:lat, lng:lng, geonameId: geonameId});
					if (committeeModel.length === 0){
						var committeeModel = await Committee.create(model)
						console.log(committeeModel);
						Committee.publishCreate(committeeModel);
						if (nestLevel < 2){dataService.getGeoNamesByParent(committeeData.geonameId, committeeModel.id, username, nestLevel);}
					}
					else{
						//Committee.update({id:committeeModel[0].id}, model);
						if (nestLevel < 2){dataService.getGeoNamesByParent(committeeData.geonameId, committeeModel[0].id, username, nestLevel);}
					}
				}
			}
		}
	},

	//TODO: GEONAMES APP
	//TOP LEVEL DATA GATHERING
	//TODO: ABSTRACT . . . RE APP,
	getNamesWorld: async function(recursion){
		var model = { url: 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=troverman', json: true};
		var body = await rp(model);
		var countryData = body.geonames;
		for (x in countryData){
			var committeeData = countryData[x];
			var title = committeeData.countryName;
			var urlTitle = title.replace(/ /g,"-").toLowerCase();
			var committeeModel = await Committee.find({urlTitle:urlTitle});
			if (committeeModel.length === 0){
				//dataService.getGeoNamesByParent(committeeData.geonameId, committeeModel[0].id, 'voetr5');
			}
			else{dataService.getGeoNamesByParent(committeeData.geonameId, committeeModel[0].id, 'troverman', recursion || 0);}
		}
	},

	//TODO: GEONAMES APP
	//GLOBAL NATIONAL GOVENMENTS
	//COMMITTEES
	//SOURCE: GEONAMES API / GEONAMES APP
	nationalCommittees: async function(){
		var model = {
			url: 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=troverman',
			json: true,
		};
		var body = rp(model);
		var countryData = body.geonames;
		for(x in countryData){
			var title = countryData[x].countryName;
			var urlTitle = title.replace(/ /g,"-").toLowerCase();
			var model = {
				parent: null,
				title: title,
				urlTitle: urlTitle
			};
			var committee = await Committee.findOrCreate({urlTitle: urlTitle}, model);
			console.log('national committee created');
		}
	},


	//TODO: PROPUBLICA APP :)
	federalBillsProPublica: async function(offset){

		function validateBody(body, params){
			body.isValid = false;
			if (params == 'cosponsors'){if (body && body.results) {if (body.results.cosponsors){body.isValid = true;}}}
			else{if (body && body.results) {if (body.results.length>0){body.isValid = true;}}}
			return body;
		}

		var chambers = ['house', 'senate'];
		for(x in chambers){

			var model= {
				url: 'https://api.propublica.org/congress/v1/115/'+ chambers[x] +'/bills/introduced.json?offset='+offset,
				json: true,
				headers: {'X-API-Key': propublicaApiKey},
			};
			var body = await rp(model);
			body = validateBody(body);
			if (body.isValid){
		
				var billData = body.results[0];
				for (x in billData.bills){

					var billId = billData.bills[x].bill_id;
					var model= {
						url: 'https://api.propublica.org/congress/v1/115/bills/'+billId.slice(0, - 4)+'.json',
						json: true,
						headers: {'X-API-Key': propublicaApiKey}
					};
					var body = await request(model);
					body = validateBody(body);

					if (body.isValid){
	
						var billData = body.results[0];
						var actions = billData.actions;
						var committees = billData.committees;				
						var congress = billData.congress;
						var congressGovUrl = billData.congressdotgov_url;
						var number = billData.number.replace(/\D/g,'');
						var officialId = billData.bill_id;
						var officialUrl = billData.congressdotgov_url;
						var type = billData.bill_type;
						var summary = billData.summary;
						var summaryShort = billData.summary_short;
						var title = billData.title;
						var urlTitle = title.replace(/ /g,"-").replace(/,/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"").toLowerCase();
						var fullTextLink = 'https://api.fdsys.gov/link?collection=bills&billtype=' + type + '&billnum=' + number + '&congress=' + congress + '&link-type=html';

						//https://www.congress.gov/115/bills/hr2810/BILLS-115hr2810enr.xml 
						//https://www.congress.gov/bill/115th-congress/house-bill/2810/committees
						//https://www.gpo.gov/fdsys/pkg/BILLS-115sres37is/html/BILLS-115sres37is.htm
						//'https://www.gpo.gov/fdsys/pkg/BILLS-'+congress+type+'/html/BILLS-'+congress+type+'.htm'

						var fullTextBody = await rp(fullTextLink);
						if (fullTextBody){if (fullTextBody.trim().substring(0, 2)=="<!"){fullTextBody = null;}}
						var model= {
							url: 'https://api.propublica.org/congress/v1/115/bills/'+billId.slice(0, - 4)+'/subjects.json',
							json: true,
							headers: {'X-API-Key': propublicaApiKey}
						};
						var subjectBody = await rp(model);


						//TODO: CONTEXT AND KEYWORDS
						//var subjects = subjectBody.results[0].subjects;
						//console.log(subjects)
						//for (x in subjects){
						//	console.log(subjects[x].name);
						//}
						//for (x in committees){
							//console.log(committees.length)
							//var committeeUrl = committees[x].toLowerCase().replace(/ /g,"-");
						//}

						var sponsor = await User.find({bioguide_id:billData.sponsor_id});
						var user = 1;
						if (sponsor.length != 0){var user = sponsor[0].id}
						var model = {
							actions: actions,
							committees: committees,
							congressGovUrl: congressGovUrl,
							fullText: fullTextBody,
							keywords: null,//subjects
							officialId: officialId,
							summary: summary,
							summaryShort: summaryShort,
							title: title,
							urlTitle: urlTitle,
							user: user
						};

						//TODO: ASSOCIATIONS
						//Bill--Member
						var billModel = await Bill.find({officialId:officialId})
						
						if (billModel.length === 0){
							var billModel = await  Bill.create(model);
							console.log('BILL CREATED');

							//TODO: ASSOCIATIONS
							//Bill -- Committee
							//for (x in committees){
								//var CommitteeBillModel
								//var committeeModel = await Committee.find({urlTitle:committeeData});
								//var billCommitteeModel
								//CommitteeBill.create();
							//}

							//var model= {
							///	url: 'https://api.propublica.org/congress/v1/115/bills/'+billId.slice(0, - 4)+'/cosponsors.json',
							//	json: true,
							//	headers: {'X-API-Key': propublicaApiKey}
							//};
							
							//Bill--Member
							//async though each user - create BillMember
							Bill.publishCreate(billModel);

							//THEN GET VOTES
							dataService.federalVotes(billModel);
							
						}

						else{
							var billModel = await Bill.update({officialId: officialId}, model)
							
							console.log('BILL UPDATED');

							var committeeUrl = committees.toLowerCase().replace(/ /g,"-").replace(/,/g,"").replace(/&#39/g,"").replace(/;/g,"")
							var committeeUrlArray = committeeUrl.split('-');
							var committeeUrlBody = committeeUrlArray.slice(1,-1).join('-');
							var refactor = committeeUrlArray[0] + '-' + committeeUrlArray[committeeUrlArray.length-1] + '-on-' + committeeUrlBody;
							
							var committeeModel = await Committee.find({urlTitle:{contains: refactor}})
							
							//TODO: ASSOCIATIONS
							if(committeeModel.length > 0){
								var committeeBillModel = {
									committee: committeeModel[0].id,
									bill: billModel[0].id,
								}
								console.log('committeeBillModel');
								console.log(committeeBillModel);
								var foundCommitteeBillModel = await CommitteeBill.find({committee:committeeModel[0].id, bill: billModel[0].id});
								if (foundCommitteeBillModel.length === 0){
									var committeeBillModel = await CommitteeBill.create(committeeBillModel);
									console.log('created committeeBill')
								}
							}
							
							var model = {
								url: 'https://api.propublica.org/congress/v1/115/bills/'+billId.slice(0, - 4)+'/cosponsors.json',
								json: true,
								headers: {'X-API-Key': propublicaApiKey}
							};
							var body = await rp(model);
							body = validateBody(validateBody, 'cosponsors');

							var cosponsors = body.results.cosponsors;
							console.log(cosponsors);

							//TODO: ASSOCIATIONS
							var billMemberModel = {}

							//THEN GET VOTES
							dataService.federalVotes(billModel[0]);

						}	
					}
				}
			}
		}
	},

	//UNITED STATES: STATE GOVERMENT API
	//BILLS | COMMITTEES | LEGISLATORS | VOTES
	//SOURCE openstates API / OPENSTATES APP
	stateBills: async function(state, pageStart, pageEnd){
		for (var page = pageStart; page <= pageEnd; page++){
			var model = {url: 'http://openstates.org/api/v1/bills/?state=' + state + '&per_page=1&page=' + page + '&apikey=' + openCongressApiKey, json: true};
			var body = await rp(model);
			if (body) {
				if (body.length>0){
        			var billData = body[0];
        			var officialId = billData.id;
					var model = {url: 'http://openstates.org/api/v1/bills/' + officialId + '?apikey=' + openCongressApiKey, json: true};
					var body = await rp(model);
					if (body) {
	        			var billData = body;
	        			var actions = billData.actions;
	        			var officialId = billData.id;
	        			var sponsors = billData.sponsors;
	        			var state = billData.state;
	        			var sources = billData.sources;
	        			var subjects = billData.subjects;
	        			//subjects.concat(billData.scraped_subjects)
						var title = billData.title;
						var type = billData.type;
						//console.log(type)
						var urlTitle;
						if (body.title){urlTitle = body.title.replace(/ /g,"-").toLowerCase();}
						if (!body.title){urlTitle = ''}

						/*var actionsAction = actions.map(function(obj){return obj.actor});
						for (x in actionsAction){
							var searchQ = actionsAction[x]//.replace(/Ref/g,'').replace(/Com/g,'');
							console.log(searchQ)
							var committee = await Committee.find({title:{contains:searchQ}});
						}
						console.log(actions[0].type)*/

						var sponsorIds = [];
						if(sponsors){sponsorIds = sponsors.map(function(obj){if (obj.leg_id!=null){return obj.leg_id}else{return []}})};
						var userModel = await User.find({leg_id:sponsorIds})
						var userModelIds = userModel.map(function(obj){return obj.id})
						var model = {
							officialId: officialId,
							committee: 1, //-->multiple committees, or in the most granular, we need state here tho..
							title: title,
							urlTitle: urlTitle,
							user: userModelIds[0],
							keywords: subjects
						};
						var billModel = await Bill.find({officialId:officialId})
						if (billModel.length === 0){
							var billModel = await Bill.create(model)
							console.log('BILL CREATED');
							dataService.stateVotes(state, billModel, billData.votes);
							Bill.publishCreate(billModel);
						}
						else{
							var billModel = await Bill.update({officialId: officialId}, model)
							console.log('BILL UPDATED');
							dataService.stateVotes(state, billModel[0], billData.votes);
						}	
					}
        		}
			}
		}  
	},

	//TODO: GET COMMITTEE MEMBERS
	//TODO: ASSOCIATIONS
	stateCommittees: async function(){
		var model = {
			url: 'https://openstates.org/api/v1//committees/?apikey=' + openCongressApiKey,
			json: true,
		};
		var body = await rp(model);
	    if (body) {
			var committeeDataArray = body;
			committeeDataArray.push({state:'dc'});

			for (x in committeeDataArray){
				var committeeData = committeeDataArray[x];

				var model = {
					url: 'http://openstates.org/api/v1/committees/' + committeeData.id + '?apikey=' + openCongressApiKey,
					json: true,
				};
				var body = await request(model);

				if (body){committeeData = body}

				var committee = committeeData.committee;
				var parent_committee_id = committeeData.parent_id;
				var state = committeeData.state;
				var subcommittee = committeeData.parent_id;
				var urlTitle;

				//TODO: DESCRIBE
				//GET CURRENT STATE AND CREATE TITLE
				if (states[state.toUpperCase()]){urlTitle = states[state.toUpperCase()].toLowerCase().replace(/ /g,"-") + '-' + committee.toLowerCase().replace(/ /g,"-").replace(/,/g,"").replace(/'/g,"");}
				
				var unitedStatesModel = await Committee.find({urlTitle:'united-states'})
				
				var newStateCommitteeModel = {
					title: states[state.toUpperCase()],
					urlTitle: states[state.toUpperCase()].toLowerCase().replace(/ /g,"-"),
					parent: unitedStatesModel[0].id 
				};
				var committeeModel = await Committee.findOrCreate({urlTitle: newStateCommitteeModel.urlTitle}, newStateCommitteeModel);
				console.log(committeeModel.urlTitle);

				var newStateLegCommitteeTitle;
				var chamber = committeeData.chamber;
				if (chamber == 'lower'){newStateLegCommitteeTitle = states[state.toUpperCase()] + ' House of Representatives'}
				if (chamber == 'upper'){newStateLegCommitteeTitle = states[state.toUpperCase()] + ' Senate'}

				var newStateLegCommitteeModel = {
					title: newStateLegCommitteeTitle,
					urlTitle: newStateLegCommitteeTitle.toLowerCase().replace(/ /g,"-"),
					parent: committeeModel.id
				};

				var newCommitteeModel = await Committee.findOrCreate({urlTitle: newStateLegCommitteeModel.urlTitle}, newStateLegCommitteeModel)
				
				var model = {
					officialId: officialId,
					title: committee,
					urlTitle: urlTitle,
					parent: newCommitteeModel.id,
					user: 1,
					//subcommittee
				};

				var committee = await Committee.find({officialId:parent_committee_id});
				if (committee){if (committee.length == 1){model.parent = committee[0].id;}}

				var committee = await Committee.findOrCreate({officialId: officialId}, model);
				var members = committeeData.members
				console.log(members.length);

				if(members.length != 0){
					for (x in members){
						var member = member[x];
						var title = member.role;
						var userModel = await User.find({leg_id:member.leg_id})
						
						if (title == null){title = 'Committee Member'}
						if (userModel.length != 0){
							
							var committeeMemberModel = {
								committee: committee.id,
								title: title,
								user: userModel[0].id
							};
							var committeeMember = await CommitteeMember.findOrCreate({committee: committee.id, user: userModel[0].id}, committeeMemberModel);
							
							CommitteeMember.publishCreate(committeeMember);
							console.log('COMMITTEE MEMBER CREATED');

							var committee = await Committee.find({urlTitle: 'united-states'});
								
							var committeeMemberModel = {
								committee: committee[0].id,
								title: userModel[0].title,
								user: userModel[0].id
							};
							var committeeMember = await  CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel);
							
							CommitteeMember.publishCreate(committeeMember);
							console.log('COMMITTEE MEMBER CREATED US');

							var committee = await Committee.find({urlTitle: states[state.toUpperCase()].replace(/ /g,"-")});
							
							var committeeMemberModel = {
								committee: committee[0].id,
								title: userModel[0].title,
								user: userModel[0].id
							};
							var committeeMember = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel);
							
							CommitteeMember.publishCreate(committeeMember);	
							console.log('COMMITTEE MEMBER CREATED STATE');

							if (userModel[0].chamber == 'lower'){

								var stateChamber = userModel[0].state + ' House of Representatives';
								var stateChamberUrl = stateChamber.toLowerCase().replace(/ /g,"-");
								var committee = await Committee.find({urlTitle: stateChamberUrl})
								
								var committeeMemberModel = {
									committee: committee[0].id,
									title: userModel[0].title,
									user: userModel[0].id
								};
								var committeeMember = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel);
								console.log('COMMITTEE MEMBER CREATED STATE HOUSE');
								CommitteeMember.publishCreate(committeeMember);
											
							}
							if (userModel[0].chamber == 'upper'){
								var stateChamber = userModel[0].state + ' Senate';
								var stateChamberUrl = stateChamber.toLowerCase().replace(/ /g,"-");
								var committee = await Committee.find({urlTitle: stateChamberUrl})
								
								var committeeMemberModel = {
									committee: committee[0].id,
									title: userModel[0].title,
									user: userModel[0].id
								};
								var committeeMember = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel);
								
								console.log('COMMITTEE MEMBER CREATED STATE SENATE');
								CommitteeMember.publishCreate(committeeMember);
									
							}
							
						}						

					}
					var updatedCommittee = await Committee.update({officialId: officialId}, model);
				}
				else{
					var updatedCommittee = await Committee.update({officialId: officialId}, model);
				}
				
			

			};
		}
	},

	//TODO: GET COMMITTEE MEMBERS
	stateLegislators: async function(){
		var model = {url: 'http://openstates.org/api/v1//legislators/?active=true&apikey=' + openCongressApiKey, json: true};
		var body = await (model);
	    if (body) {
			var stateData = body;
			for (x in stateData) {
				var first_name = stateData[x].first_name;
				var last_name = stateData[x].last_name;
				var photo_url = stateData[x].photo_url;
				var offices = stateData[x].offices;
				var district = stateData[x].district;
				var chamber = stateData[x].chamber;
				var fax = offices.map(function(obj){return obj.fax});
				var phone = offices.map(function(obj){return obj.phone});
				var address = offices.map(function(obj){return obj.address});
				var title = '';
				if (chamber == 'lower'){title = 'State Representative'}
				if (chamber == 'upper'){title = 'State Senator'}
				var state = states[stateData[x].state.toUpperCase()];
				var party = stateData[x].party;
				var leg_id = stateData[x].leg_id;

				var trim_first_name = first_name
				.trim()
				.replace(/\s+/g, '.')
				.replace(/"/g,'')
				.replace(/,/g, '')
				.replace(/\\/g, '')

				var trim_last_name = last_name
				.trim()
				.replace(/\s+/g, '.')
				.replace(/"/g,'')
				.replace(/,/g, '')
				.replace(/\\/g, '');

				var username = trim_first_name + '.' + trim_last_name;
				
				var trim_username = username
				.replace(/[()]/g, '')
				.replace(/\.\./g, '.')

				var email =  stateData[x].email;
				if( typeof email === 'undefined' || email === null || typeof email === 'string' ){
					email = trim_username + '@gmail.com';
				}

				var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg']
				var randInt = Math.floor(Math.random() * (coverUrlArray.length));
				var coverUrl = coverUrlArray[randInt];

				var model = {
					username: trim_username,
					email: email,
					electedRepresentative: true,
					firstName: first_name,
					lastName: last_name,
					title: title,
					district: district,
					address: address,
					phone: phone,
					fax: fax,
					leg_id: leg_id,
					party: party,
					avatarUrl: photo_url,
					coverUrl : coverUrl,
					state : state,
					chamber : chamber
				};

				var userModel = await User.findOrCreate({leg_id: leg_id}, model);
				User.publishCreate(userModel);

				//GOTTA DO BOTH STATE AND HOUSE / senate ETC --> as well as specific committees
				//STARTING COMMITTEE MEMBER CREATION.... THIS IS LEGIT -- MAKE CODE ORGANIZED
				//DONT FORGET FINANCE 
				/*var committee = await Committee.find({urlTitle: userModel.state.replace(/ /g,'-').toLowerCase()})
				if (committee.length == 0){console.log(userModel.state.replace(' ','-').toLowerCase())}
				else {

					//console.log(committee[0])
					//GOTTA SCOPE AND FIND UNITED STATES AS PARENT COMMITTEE.. ETC ETC
					//--> THIS IS BIG
					//THIS IS HOW WE CAN 'VALIDATE' REPS,, by the commites that they serve in ---- COMMITTEEMEMBER...
					//DOING THIS IN COMMITTEE NOW

					var committeeMemberModel = {
						committee: committee[0].id,
						title: userModel.title,
						user: userModel.id
					};
					console.log('in the code breh')
					var committeeMember = await CommitteeMember.findOrCreate({
						committee: committee[0].id,
						title: userModel.title,
						user: userModel.id
					}, committeeMemberModel);
					
					console.log('COMMITTEE MEMBER CREATED');
					CommitteeMember.publishCreate(committeeMember);											
						
				}
				*/

				
				var updatedUser = await User.update({leg_id: leg_id}, model);
				console.log('UPDATED USER', updatedUser.id)
			}
	    }
	},

	stateVotes: async function(state, bill, votes){

		//state, billModel[0], billData.votes
		for (x in votes){
		    var billId = bill.id;
		    var committee = 1;
			var minusCount = votes[x].no_count;
			var officialId = votes[x].id;
			var officialUrl;
			if (votes[x].sources.length > 0){officialUrl = votes[x].sources[0].url}
			var otherCount = votes[x].other_count;
			var plusCount = votes[x].yes_count;
		 	var required = '';
			var result;
			if(result){var result = 'Passed'}
			if(!result){var result = 'Did Not Pass'}
			var title = votes[x].motion;
			var type = votes[x].type;
			var urlTitle = votes[x].motion.replace(' ','-').toLowerCase();
			var user = 1;

			var model = {
				bill: bill.id,
				committee: committee,
				minusCount: minusCount,
				officialId: officialId,
				officialUrl: officialUrl,
				otherCount: otherCount,
				plusCount: plusCount,
				required: required,
				result: result,
				title: title,
				type: type,
				urlTitle: urlTitle,
				user: user,
			};

			var yesVotesArray = _.map(votes[x].yes_votes, function(element) { 
			     return _.extend({}, element, {vote: 1, voteString: 'Yea'});
			});
			var noVotesArray = _.map(votes[x].no_votes, function(element) { 
			     return _.extend({}, element, {vote: -1, voteString: 'Nay'});
			});
			var otherVotesArray = _.map(votes[x].other_votes, function(element) { 
			     return _.extend({}, element, {vote: 0, voteString: 'No Vote'});
			});
			var votesArray = [];
			var votesArray = votesArray.concat(yesVotesArray, noVotesArray, otherVotesArray);

			//TODO: ASSOCIATIONS 
			//Bill--Vote
			var voteModel = await Vote.findOrCreate({officialId: officialId}, model)
			console.log('VOTE FIND OR CREATE');

			//PASS TO VOTE VOTE :P
			dataService.stateVoteVotes(state, voteModel, votesArray)
			
			var voteModel = await Vote.update({officialId: officialId}, model)
			console.log('VOTE UPDATED');

		}
	},

	stateVoteVotes: async function(state, vote, votes){
		for (x in votes){
			
			var voteVoteModel = votes[x];
			var userModel = await User.find({leg_id: voteVoteModel.leg_id})
			var user = userModel;
			if(user[0]){user = userModel[0].id}
			var model = {
				voteInteger: voteVoteModel.vote,
				voteString: voteVoteModel.voteString,
				vote: vote.id,
				bill: vote.bill,
				user: user
			};

			console.log(user);
			var voteVoteModel = await VoteVote.findOrCreate({bill: model.bill, vote: model.vote, user: model.user}, model)
			VoteVote.publishCreate(voteVoteModel);
			
			//TODO: COUNTS AND DETAIL
			var voteCount = await VoteVote.count().where({vote:vote.id});
			console.log(voteCount);

			//Bill--Vote
			//TODO: ASSOCIATION
			var updatedVote = await Vote.update({id: vote.id}, {voteCount:voteCount});
					
		}
	},

	//SUNLIGHT FOUNDATION 
	//BILLS | COMMITTEES | LEGISLATORS | VOTES | VOTE-VOTES
	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	federalBills: async function(pageStart, pageEnd){

		for (var page = pageStart; page <= pageEnd; page++){
			var model = {
				url: 'https://congress.api.sunlightfoundation.com/bills?&per_page=1&page=' + page + '&fields=actions,bill_id,bill_type,committee_ids,congress,keywords,number,official_title,related_bill_ids,short_title,sponsor,summary,summary_short,urls,upcoming&apikey=' + openCongressApiKey,
				json: true,
			};
			var body = await rp(model);
			if (body) {
				if (body.results.length>0){
					var billData = body.results[0];
					var actions = billData.actions;
					var committees = billData.committee_ids;						
					var congress = billData.congress;
					var keywords = billData.keywords;
					var number = billData.number;
					var officialId = billData.bill_id;
					//console.log(officialId)
					var officialUrl = billData.urls.congress;
					var relatedBills = billData.related_bill_ids;
					var summary = billData.summary;
					var summaryShort = billData.summary_short;
					var sponsor = billData.sponsor;
					var title;
					if (billData.short_title){title = billData.short_title}
					else{title = billData.official_title}
					var type = billData.bill_type;
					var urlTitle;
					if (title){urlTitle = title.replace(/ /g,"-").replace(/,/g,"").replace(/"/g,"").replace(/'/g,"").replace(/\./g,"").toLowerCase()}
					var upcoming = billData.upcoming;
					var congressGovUrl = 'https://www.congress.gov/bill/'+congress+'th-congress/'+type+'-bill/'+number;
					console.log(type);
					console.log(billData);
					var fullTextLink = 'https://api.fdsys.gov/link?collection=bills&billtype=' + type + '&billnum=' + number + '&congress=' + congress + '&link-type=html';
					var body = await request(fullTextLink);
					if (body){if (body.trim().substring(0, 2)=="<!"){body = null;}}
					var sponsor = await User.find({bioguide_id:sponsor.bioguide_id});
					var committees = await Committee.find({officialId: committees});
					var relatedBills = await Bill.find({officialId:relatedBills});
					var user = 1;
					if (sponsor.length != 0){var user = sponsor[0].id}
					var relatedBillIds = relatedBills.map(function(obj){return obj.id});
					var committeeIds = committees.map(function(obj){return obj.id});
					var model = {
						actions: actions,
						//committee: committeeIds, //testing
						committees: committees,
						//congressGovUrl: congressGovUrl,
						fullText: body,
						keywords: keywords,
						officialId: officialId,
						relatedBills: relatedBills,
						summary: summary,
						summaryShort: summaryShort,
						title: title,
						urlTitle: urlTitle,
						upcoming: upcoming,
						user: user
					};
					var billModel = await Bill.find({officialId:officialId});
					if (billModel.length === 0){
						var billModel = await Bill.create(model);
						console.log('BILL CREATED');
						dataService.federalVotes(billModel);
						Bill.publishCreate(billModel);
					}
					else{
						var billModel = await Bill.update({officialId: officialId}, model);
						console.log('BILL UPDATED');
						dataService.federalVotes(billModel[0]);
					}
	        	}
        	}
		}
	},

	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	federalCommittees: async function(){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/committees?fields=chamber,committee_id,members,name,parent_committee_id&per_page=all&apikey=' + openCongressApiKey,
			json: true,
		};
		var body = await rp(model);
		if (body.results) {
    		var committeeDataArray = body.results;
    		for (x in committeeDataArray){

    			var committeeData = committeeDataArray[x];
    			var chamber = committeeData.chamber;
				var officialId = committeeData.committee_id;
				var members = committeeData.members;
				var title = committeeData.name;
				var urlTitle = title.toLowerCase().replace(/ /g,'-').replace(/,/g , '').replace(/'/g , '');
				var parent_committee_id = committeeData.parent_committee_id;
				var unitedStatesModel = {
					title: 'United States',
					urlTitle: 'united-states',
					parent: null
				};
				var newCommittee;
				if (chamber == 'house'){newCommittee = 'United States House of Representatives'}
				if (chamber == 'senate'){newCommittee = 'United States senate'}
				if (chamber == 'joint'){newCommittee = 'United States'}
				var committeeModel = await Committee.findOrCreate({urlTitle: unitedStatesModel.urlTitle}, unitedStatesModel);

				if (newCommittee){
					var newLegCommitteeModel = {
						title: newCommittee,
						urlTitle: newCommittee.toLowerCase().replace(/ /g,'-'),
						parent: committeeModel.id
					};
					var newCommitteeModel = await Committee.findOrCreate({urlTitle: newLegCommitteeModel.urlTitle}, newLegCommitteeModel);
					var model = {
						chamber: chamber,
						officialId: officialId,
						parent: newCommitteeModel.id,
						title: title,
						urlTitle: urlTitle,
						user: 1,
					};
					var committee = await Committee.find({officialId:parent_committee_id});
					if (committee.length == 1){model.parent = committee[0].id;}
					var committeeModel = await Committee.findOrCreate({officialId: officialId}, model);
					console.log(members.length);
					if(members.length != 0){
						for (x in members){
							var member = members[x];
							console.log(member.legislator.bioguide_id);
							var userModel = await User.find({bioguide_id:member.legislator.bioguide_id});
							
							var title = member.title;
							if (title == null){title = 'Committee Member'}
							var committeeMemberModel = {
								committee: committeeModel.id,
								title: title,
								user: userModel[0].id
							};

							console.log(committeeMemberModel.user);

							var committeeMember = await CommitteeMember.findOrCreate({committee: committeeModel.id, user: userModel[0].id}, committeeMemberModel)
							console.log('COMMITTEE MEMBER CREATED');
							CommitteeMember.publishCreate(committeeMember);

							var committeeMember = await Committee.find({urlTitle: 'united-states'})
							var committeeMemberModel = {
								committee: committee[0].id,
								title: userModel[0].title,
								user: userModel[0].id
							};
							var committeeMember = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
							console.log('COMMITTEE MEMBER CREATED US');
							CommitteeMember.publishCreate(committeeMember);

							if (userModel[0].chamber == 'senate'){
								var committee = await Committee.find({urlTitle: 'united-states-senate'})
								var committeeMemberModel = {
									committee: committee[0].id,
									title: userModel[0].title,
									user: userModel[0].id
								};
								var committeeMemberModel = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
								console.log('COMMITTEE MEMBER CREATED SENATE');
								CommitteeMember.publishCreate(committeeMember);
							}
							if (userModel[0].chamber == 'house'){
								var committee = await Committee.find({urlTitle: 'united-states-house-of-representatives'})
								var committeeMemberModel = {
									committee: committee[0].id,
									title: userModel[0].title,
									user: userModel[0].id
								};
								var committeeMemberModel = await CommitteeMember.findOrCreate({committee: committee[0].id, user: userModel[0].id}, committeeMemberModel)
								console.log('COMMITTEE MEMBER CREATED HOUSE')
								CommitteeMember.publishCreate(committeeMember);													
							}
																				
						}								
					}
					var updatedCommittee = await Committee.update({officialId: officialId}, model);
				}

    		}	
		}
	},

	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	federalLegislators: async function(){
		var model = {
			url: 'http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=' + openCongressApiKey,
			json: true,
		};
		var body = await rp(model);
	    if (body.results) {
			var congressData = body.results;
			for (x in congressData) {
				var bioguide_id = congressData[x].bioguide_id;
				console.log(bioguide_id)
				var birthday = congressData[x].birthday;
				var chamber = congressData[x].chamber
				var crp_id = congressData[x].crp_id;
				var district = congressData[x].district;
				var facebook_id = congressData[x].facebook_id;
				var fax = congressData[x].fax;
				var fec_ids = congressData[x].fec_ids;
				var first_name = congressData[x].first_name;
				var gender = congressData[x].gender;
				var govtrack_id = congressData[x].govtrack_id;
				var in_office = congressData[x].in_office;
				var last_name = congressData[x].last_name;
				var leadership_role = congressData[x].leadership_role;
				var middle_name = congressData[x].middle_name;
				var office = congressData[x].office;
				var party = congressData[x].party;
				var phone = congressData[x].phone;
				var state = congressData[x].state;
				var state_name = congressData[x].state_name;
				var term_end = congressData[x].term_end;
				var term_start = congressData[x].term_start;
				var thomas_id = congressData[x].thomas_id;
				var twitter_id = congressData[x].twitter_id;
				var website = congressData[x].website;
				var username = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.');
				var email = first_name.replace('.','').replace(' ','.') + '.' + last_name.replace(' ','.') + '@gmail.com';
				var socialAccounts = {};
				if (twitter_id != null){socialAccounts.twitter = {profileUrl: 'https://www.twitter.com/' + twitter_id}};
				if (facebook_id != null){socialAccounts.facebook = {profileUrl: 'https://www.facebook.com/' + facebook_id}};
				var avatarUrl = 'https://theunitedstates.io/images/congress/original/'+bioguide_id+'.jpg'
				var coverUrlArray = ['images/congress.jpg', 'images/congress1.jpg', 'images/crowd.jpg', 'images/capitol.jpg', 'images/capitol1.jpg', 'images/bokeh.jpg', 'images/metro.jpg', 'images/brasil.jpg', 'images/natural.jpg']
				var randInt = Math.floor(Math.random() * (coverUrlArray.length));
				var coverUrl = coverUrlArray[randInt];
				var title ='';
				if (chamber == 'senate'){title = 'US Senator'}
				if (chamber == 'house'){title = 'US Representative'}
				var model = {
					username: username,
					email: email,
					firstName: first_name,
					lastName: last_name,
					socialAccounts: socialAccounts,
					leadership_role:leadership_role,
					phone: phone,
					party: party,
					state: state_name,
					title: title,//--> this is on a committee basis
					district: district,
					term_end: term_end,
					term_start: term_start,
					bioguide_id: bioguide_id,
					avatarUrl: avatarUrl,
					coverUrl : coverUrl,
					chamber: chamber,
					isOfficial: true
				};
				var userModel = await User.findOrCreate({bioguide_id: bioguide_id}, model)
				User.publishCreate(userModel);
				var updatedUser = await User.update({bioguide_id: bioguide_id}, model);

			}
	    }
	},

	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	federalVotes: async function(bill){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/votes?bill_id=' + bill.officialId + '&fields=breakdown,question,required,result,roll_id,url,vote_type&apikey=' + openCongressApiKey,
			json: true,
		};
		var body = await rp(model);
		if (body && body.results) {
			if (body.results.length>0){
        		var voteData = body.results;
				for (x in voteData){
					var voteModel = voteData[x];
					var billId = bill.id;
					var minusCount = voteData[x].breakdown.total.Nay;
					var plusCount = voteData[x].breakdown.total.Yea;
					var otherCount = voteData[x].breakdown.total['Not Voting']
					var required = voteData[x].required;
					var result = voteData[x].result;
					var title = voteData[x].question;
					var type = voteData[x].vote_type;
					var officialId = voteData[x].roll_id;
					var officialUrl = voteData[x].url;
					var urlTitle = voteData[x].question.replace(' ','-').toLowerCase();
					var model = {
						bill: bill.id,
						committee: 1,
						minusCount: minusCount,
						plusCount: plusCount,
						officialId: officialId,
						officialUrl: officialUrl,
						otherCount: otherCount,
						required: required,
						result: result,
						title: title,
						type: type,
						urlTitle: urlTitle,
						user: 1,
					};
					//BillVote
					var voteModel = await Vote.findOrCreate({officialId: officialId}, model)
					console.log('VOTE FIND OR CREATE');
					dataService.federalVoteVotes(voteModel);
					//BillVote
					var voteModel = awaitVote.update({officialId: officialId}, model)
					console.log('VOTE UPDATED');
				}
			}
    	}
	},

	//OUTDATED CODE: LEGACY: SUNLIGHT FOUNDATION API IS CLOSED 
	federalVoteVotes: async function(vote){
		var model = {
			url: 'https://congress.api.sunlightfoundation.com/votes?roll_id=' + vote.officialId + '&fields=voters&apikey=' + openCongressApiKey,
			json: true,
		};
		var body = await rp(model);
		if (body && body.results) {
			if (body.results.length>0){
				var voteVoteData = body.results[0].voters;
				for (x in voteVoteData){

					var voteVoteModel = voteVoteData[x];
					var userModel = await User.find({bioguide_id: voteVoteModel.voter.bioguide_id})
					var voteInteger = 0;
					var user = userModel;
					if(voteVoteModel.vote == 'Yea' || voteVoteModel.vote == 'Aye'){voteInteger = 1;}
					if(voteVoteModel.vote == 'Nay' || voteVoteModel.vote == 'No'){voteInteger = -1;}
					if(user[0]){user = userModel[0].id}
					var model = {
						voteInteger: voteInteger,
						voteString: voteVoteModel.vote,
						vote: vote.id,
						bill: vote.bill,
						user: user
					};
					var voteVoteModel = await VoteVote.findOrCreate({bill: model.bill, vote: model.vote, user: model.user}, model)
					VoteVote.publishCreate(voteVoteModel);
					//userModel.-->twitter
					//vote.bill
					//vote
					//break into positive and negative..!
					var voteCount = await VoteVote.count().where({vote:vote.id});
					console.log(voteCount)
					//Bill--Vote
					var billVote = await Vote.update({id: vote.id}, {voteCount:voteCount});
				}
			}
    	}      	
	},

}