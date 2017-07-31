app.controller('singleMatchController',['getRequestService' , '$routeParams', function(getRequestService , $routeParams){

	this.heading = "" ;
	var main = this ;
	this.id1 = $routeParams.id1 ;
	this.id2 = $routeParams.id2;
	this.date = $routeParams.date;
	//this.team2 = $routeParams.team2;
	console.log(this.date);
	
	this.name1 = "" ; 
	this.name2 = "" ; 
	this.score1 = '';
	this.score2 = '';
	this.winner = '';
	

	this.loadSingleMatchStats = function() {

		function matchStatsCalculator(response) {

			main.data = response.data.rounds ;

			for(var i in main.data){
								
							for(var j in main.data[i].matches){
									
								console.log("cleared if statement");
							if( (i == main.id1) && (j == main.id2) && (main.date == main.data[i].matches[j].date))
								{	
									//main.heading = main.data[i].matches[j].team1.name + "vs" + main.data[i].matches[j].team2.name;
									main.name1 = main.data[i].matches[j].team1.name ;
									main.name2 = main.data[i].matches[j].team2.name ;
									main.heading = main.name1 + " vs " + main.name2 ;
									main.score1 = main.data[i].matches[j].score1 ;
									main.score2 = main.data[i].matches[j].score2 ;
									main.team1 = main.data[i].matches[j].team1.code ;
									main.team2 = main.data[i].matches[j].team2.code ;
									
									if( main.score2 > main.score1)
										main.winner = "Winner : " + main.name2 ;
									else if(main.score2 < main.score1)
										main.winner = "Winner : " + main.name1 ;
									else main.winner = " Match tied !";

									console.log(main.data[i].matches[j].date);
									console.log(main.data[i].matches[j].team1.code);
								}
							}
						}
		}

		
			main.loadSingleMatchStatsOf2015 = function (){

				getRequestService.getDetailsOf2015()
				.then(function(response){

						console.log(response.data.rounds);
						
						matchStatsCalculator(response) ;
						

					} , function(reason){

						alert(" Some Error Occured! Check Console");
						console.log("reason");

					})  // end of get request

			} (); // end of function loadSingleMatchStatsOf2015	


			main.loadSingleMatchStatsOf2016 = function (){

				getRequestService.getDetailsOf2016()
				.then(function(response){

						matchStatsCalculator (response);
						

					} , function(reason){

						alert("Some error occured. Check console!")
						console.log(reason);

					}) ; // end of get request

			} (); // end of function loadSingleMatchStatsOf2016

	} (); // end of loadSingleMatchStats		

}]);// end of single match controller