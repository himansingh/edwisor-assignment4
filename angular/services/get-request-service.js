app.service('getRequestService', function($http){

	var main = this ;

	this.getDetailsOf2016 = function (){

		return $http({
					method : "GET",
					url : "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json"

				}) // end of return
	} // end of getDetailsOf2016

	this.getDetailsOf2015 = function (){

		return $http({
					method : "GET",
					url : "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json"

				}) // end of return
	} // end of getDetailsOf2016

});