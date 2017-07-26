var app = angular.module('EPL',['ngRoute']);

app.controller('mainController',['$http', function($http){


	var main = this ;
	this.heading = " EPL FIXTURES " ;
	this.subheading = " Result of all EPL clashes in 2015 and 2016." ;
	this.tableCaption = "English Premier League 2015 - 2017";
	this.contentsOf2016 = [] ;
	this.contentsOf2015 = [] ;

	this.loadAllMatches = function() {

			main.loadMatchesHeldIn2016 = function(){

				$http({
					method : "GET",
					url : "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json"

				}).then(function success (response){

					console.log(response);
					main.contentsOf2016 = response.data.rounds ;
					

				}, function(reason){
					alert("Some error occured");
					console.log(reason);

				});

			}();// call and end of loadMatchesHeldIn2016

			main.loadMatchesHeldIn2015 = function(){

				$http({
					method : "GET",
					url : "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json"

				}).then(function success (response){

					console.log(response);
					main.contentsOf2015 = response.data.rounds ;
					

				}, function(reason){
					alert("Some error occured");
					console.log(reason);

				});
			}();	//call and end of loadMatchesHeldIn2015

	} (); // end of loadAllMatches

}]); // end of main controller



app.controller('teamStatsController', ['$http' , function($http){

	var main = this;
	this.heading = "Team Statistics" ;
	this.statsOf2015 = {} ;
	this.statsOf2016 = {} ;

	this.loadTeamStats = function() {

			var teamName = document.getElementById("inpt").value;
			document.getElementById("invisible").style.visibility = "visible";
			var flag  ; 
			main.loadTeamStatsOf2016 = function(){

				$http({

					method	: "GET", 
					url 	: "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json"

				}).then(function(response){

					
					console.log(response);


						var teamData = response.data.rounds  ;
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

							main.statsOf2016.winPercent = ((noOfWins*100)/noOfMatches).toFixed(2) ;
							main.statsOf2016.lossPercent = ((noOfLosses*100)/noOfMatches).toFixed(2) ;
							main.statsOf2016.goalDifference = noOfGoalsScored - noOfGoalsConceded ;
							main.statsOf2016.totalMatches = noOfMatches ;
							main.statsOf2016.totalWins = noOfWins ;
							main.statsOf2016.totalLosses = noOfLosses ;
							main.statsOf2016.totalGoalsScored = noOfGoalsScored ;
							main.statsOf2016.totalGoalsConceded = noOfGoalsConceded ;
							main.statsOf2016.totalTies = noOfTies ;
							
							if(flag != 1)
								alert("Team did not play in 2016 !")

				} , function(reason){

					alert("Some error occured, check console") ;
					console.log( reason ) ;

				}); // end of http get request

				
			
			} (); // end of loadteamstatsof2016


			main.loadTeamStatsOf2015 = function(){

				$http({

					method	: "GET", 
					url 	: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json"

				}).then(function(response){

					console.log(response);

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

					main.statsOf2015.winPercent = ((noOfWins*100)/noOfMatches).toFixed(2) ;
					main.statsOf2015.lossPercent = ((noOfLosses*100)/noOfMatches).toFixed(2) ;
					main.statsOf2015.goalDifference = noOfGoalsScored - noOfGoalsConceded ;
					main.statsOf2015.totalMatches = noOfMatches ;
					main.statsOf2015.totalWins = noOfWins ;
					main.statsOf2015.totalLosses = noOfLosses ;
					main.statsOf2015.totalGoalsScored = noOfGoalsScored ;
					main.statsOf2015.totalGoalsConceded = noOfGoalsConceded ;
					main.statsOf2015.totalTies = noOfTies ;

					if(flag != 1 )
						alert(" Team did not play in 2015! ")

				} , function(reason){

					alert("Some error occured, check console") ;
					console.log(reason) ;

				}); // end of http get request

			} (); // end of loadTeamStatsOf2015.
							

	} // end of loadTeamStats

}]);// end of team stats controller

app.controller('singleMatchController',['$http' , '$routeParams', function($http , $routeParams){

	this.heading = "" ;
	var main = this ;
	this.date = $routeParams.date ;
	this.team1 = $routeParams.team1;
	this.team2 = $routeParams.team2;
	
	this.name1 = "" ; 
	this.name2 = "" ; 
	this.score1 = '';
	this.score2 = '';
	this.winner = '';
	

	this.loadSingleMatchStats = function() {

		
			main.loadSingleMatchStatsOf2015 = function (){

				$http({

						method :"GET" ,
						url : "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json" 

					}).then(function(response){

						main.data = response.data.rounds ;
						
						for(var i in main.data){
							
							for(var j in main.data[i].matches){
								//console.log(main.data[i].matches[j].date);
								//console.log(main.data[i].matches[j].team1.code);
								console.log(main.team2);
							if( (main.data[i].matches[j].date == main.date) && (main.data[i].matches[j].team1.code == main.team1) && (main.data[i].matches[j].team2.code == main.team2))
								{
									//main.heading = main.data[i].matches[j].team1.name + "vs" + main.data[i].matches[j].team2.name;
									main.name1 = main.data[i].matches[j].team1.name ;
									main.name2 = main.data[i].matches[j].team2.name ;
									main.heading = main.name1 + " vs " + main.name2 ;
									main.score1 = main.data[i].matches[j].score1 ;
									main.score2 = main.data[i].matches[j].score2 ;
									
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
						

					} , function(reason){

						alert(" Some Error Occured! Check Console");
						console.log("reason");

					})  // end of get request

			} (); // end of function loadSingleMatchStatsOf2015	


			main.loadSingleMatchStatsOf2016 = function (){

				$http({

						method :"GET" ,
						url : "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json" 

					}).then(function(response){

						main.data = response.data.rounds ;
						
						for(var i in main.data){
							
							for(var j in main.data[i].matches){
								//console.log(main.data[i].matches[j].date);
								//console.log(main.data[i].matches[j].team1.code);
								console.log(main.team2);
							if( (main.data[i].matches[j].date == main.date) && (main.data[i].matches[j].team1.code == main.team1) && (main.data[i].matches[j].team2.code == main.team2))
								{
									//main.heading = main.data[i].matches[j].team1.name + "vs" + main.data[i].matches[j].team2.name;
									main.name1 = main.data[i].matches[j].team1.name ;
									main.name2 = main.data[i].matches[j].team2.name ;
									main.heading = main.name1 + " vs " + main.name2 ;
									main.score1 = main.data[i].matches[j].score1 ;
									main.score2 = main.data[i].matches[j].score2 ;
									
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
						

					} , function(reason){

						alert("Some error occured. Check console!")
						console.log(reason);

					}) ; // end of get request

			} (); // end of function loadSingleMatchStatsOf2016

	} (); // end of loadSingleMatchStats		

}]);// end of single match controller

