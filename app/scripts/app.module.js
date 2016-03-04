/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    'use strict';
    angular.module('app', ['ngRoute']);
    angular.module('app')
        .config(function($routeProvider){
            $routeProvider
                .when('/', {
                    controller: 'mainController',
                    templateUrl: 'views/food-trucks.html',
                    controllerAs: 'vm'
                })
                .otherwise({redirectTo: '/'});
        });
})();

