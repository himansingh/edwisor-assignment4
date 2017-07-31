app.controller('mainController',['getRequestService', function(getRequestService){


	var main = this ;
	this.heading = " EPL FIXTURES " ;
	this.subheading = " Result of all EPL clashes in 2015 and 2016." ;
	this.tableCaption = "English Premier League 2015 - 2017";
	this.contentsOf2016 = [] ;
	this.contentsOf2015 = [] ;

	this.loadAllMatches = function() {

			main.loadMatchesHeldIn2016 = function(){

				getRequestService.getDetailsOf2016()
				.then(function success (response){

					console.log(response);
					main.contentsOf2016 = response.data.rounds ;
					

				}, function(reason){
					alert("Some error occured");
					console.log(reason);

				});

			}();// call and end of loadMatchesHeldIn2016

			main.loadMatchesHeldIn2015 = function(){

				getRequestService.getDetailsOf2015()
				.then(function success (response){

					console.log(response);
					main.contentsOf2015 = response.data.rounds ;
					

				}, function(reason){
					alert("Some error occured");
					console.log(reason);

				});
			}();	//call and end of loadMatchesHeldIn2015

	} (); // end of loadAllMatches

}]); // end of main controller