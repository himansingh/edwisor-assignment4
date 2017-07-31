app.controller('teamStatsController', ['getRequestService' , function(getRequestService){

	var main = this;
	this.heading = "Team Statistics" ;
	this.statsOf2015 = {} ;
	this.statsOf2016 = {} ;

	this.loadTeamStats = function() {

			var teamName = document.getElementById("inpt").value;
			document.getElementById("invisible").style.visibility = "visible";
			var flag = 0 , count = 0 ; 

			function teamStatsCalculator(response , year){

				var teamData = response.data.rounds ;
				var noOfMatches = 0 , noOfGoalsScored = 0 , noOfGoalsConceded = 0 ;
				var noOfTies = 0 , noOfWins = 0 ; noOfLosses = 0 ;

				for( var i in teamData){
								
								for( var j in teamData[i].matches){

									if( teamData[i].matches[j].team1.name == teamName){
											flag = 1;
											
										noOfMatches++ ;

										noOfGoalsScored += teamData[i].matches[j].score1 ; 
										noOfGoalsConceded += teamData[i].matches[j].score1 ;
										
										if( teamData[i].matches[j].score1 == teamData[i].matches[j].score2)
											noOfTies ++;

										else if( teamData[i].matches[j].score1 > teamData[i].matches[j].score2)
											noOfWins ++;

										else if( teamData[i].matches[j].score1 < teamData[i].matches[j].score2)
											noOfLosses ++;

									} // end of  if condition

									else if ( teamData[i].matches[j].team2.name == teamName){
												flag = 1;
												
										noOfMatches++ ;

										noOfGoalsScored += teamData[i].matches[j].score2 ;
										noOfGoalsConceded += teamData[i].matches[j].score1 ;

										if( teamData[i].matches[j].score1 == teamData[i].matches[j].score2)
											noOfTies ++;

										else if( teamData[i].matches[j].score1 < teamData[i].matches[j].score2)
											noOfWins ++;

										else if( teamData[i].matches[j].score1 > teamData[i].matches[j].score2)
											noOfLosses ++;

									} // end of else if

								} // end of inner loop 

							}// end of teamData loop

					function detailsOf2016(flag) {

						if (flag != 2016 ){
							alert("Team did not play in 2016");
						}
						main.statsOf2016.winPercent = ((noOfWins*100)/noOfMatches).toFixed(2) ;
						main.statsOf2016.lossPercent = ((noOfLosses*100)/noOfMatches).toFixed(2) ;
						main.statsOf2016.goalDifference = noOfGoalsScored - noOfGoalsConceded ;
						main.statsOf2016.totalMatches = noOfMatches ;
						main.statsOf2016.totalWins = noOfWins ;
						main.statsOf2016.totalLosses = noOfLosses ;
						main.statsOf2016.totalGoalsScored = noOfGoalsScored ;
						main.statsOf2016.totalGoalsConceded = noOfGoalsConceded ;
						main.statsOf2016.totalTies = noOfTies ;
					}

					if(year == 2016 ){
						if (flag == 1)
						flag = 2016;
						detailsOf2016(flag);
						
					}
					
					function detailsOf2015(){

						if (flag != 2015){
							alert("Team did not play in 2015");
						}
						main.statsOf2015.winPercent = ((noOfWins*100)/noOfMatches).toFixed(2) ;
						main.statsOf2015.lossPercent = ((noOfLosses*100)/noOfMatches).toFixed(2) ;
						main.statsOf2015.goalDifference = noOfGoalsScored - noOfGoalsConceded ;
						main.statsOf2015.totalMatches = noOfMatches ;
						main.statsOf2015.totalWins = noOfWins ;
						main.statsOf2015.totalLosses = noOfLosses ;
						main.statsOf2015.totalGoalsScored = noOfGoalsScored ;
						main.statsOf2015.totalGoalsConceded = noOfGoalsConceded ;
						main.statsOf2015.totalTies = noOfTies ;
					}		

					if(year == 2015 ){
						if (flag == 1)
						flag = 2015 ;
						detailsOf2015(flag);
					}		
			} // end of function

			main.loadTeamStatsOf2016 = function(){

				getRequestService.getDetailsOf2016()
				.then(function(response){

					
					console.log(response);
					var year = 2016;

					teamStatsCalculator(response ,year);


				} , function(reason){

					alert("Some error occured, check console") ;
					console.log( reason ) ;

				}); // end of http get request

				
			
			} (); // end of loadteamstatsof2016


			main.loadTeamStatsOf2015 = function(){

				getRequestService.getDetailsOf2015()
				.then(function(response){

					console.log(response);
					var year = 2015 ;
					
					teamStatsCalculator(response , year);					

										
				} , function(reason){

					alert("Some error occured, check console") ;
					console.log(reason) ;

				}); // end of http get request

			} (); // end of loadTeamStatsOf2015.
							

	} // end of loadTeamStats

}]);// end of team stats controller