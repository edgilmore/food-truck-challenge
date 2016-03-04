/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    'use strict';
    angular.module('app', ['ngRoute', 'uiGmapgoogle-maps']);
    angular.module('app')
        .config(function($routeProvider, uiGmapGoogleMapApiProvider){
            uiGmapGoogleMapApiProvider.configure({
                v: '3.2.2',
                libraries: 'weather,geometry,visualization'
            });
            $routeProvider
                .when('/', {
                    controller: 'mainController',
                    templateUrl: 'views/food-trucks.html',
                    controllerAs: 'vm'
                })
                .otherwise({redirectTo: '/'});
        });
})();

