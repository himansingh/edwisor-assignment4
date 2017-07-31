app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/main-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'mainView'
        })
        .when('/team',{
        	templateUrl     : 'views/team-view.html',
        	controller 		: 'teamStatsController',
        	controllerAs 	: 'team'
        })
        .when('/match/:id1/:id2/:date',{
            templateUrl     : 'views/match-view.html',
            controller      : 'singleMatchController',
            controllerAs    : 'match'
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1 style="margin-top:50px;"><center>Error 404 : Page not found</center></h1>'
            }
        );
}]);