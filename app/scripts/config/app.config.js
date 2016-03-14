/**
 * Created by Edward on 3/13/2016.
 */
(function(){
    angular
        .module('app')
        .config(config);

    config.$inject = ['$routeProvider', 'uiGmapGoogleMapApiProvider'];

    function config($routeProvider, uiGmapGoogleMapApiProvider){
        uiGmapGoogleMapApiProvider.configure({
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'views/food-trucks.html',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }
})();