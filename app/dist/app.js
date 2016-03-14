/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    'use strict';
    angular
        .module('app', ['ngRoute', 'uiGmapgoogle-maps']);
})();


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
/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    angular
        .module('app')
        .controller('MainController', MainController);
    //dependency injection
    MainController.$inject = ['dataService', 'uiGmapGoogleMapApi', 'map', 'markers'];
    //controller function
    function MainController(dataService, uiGmapGoogleMapApi, map, markers){
        var vm = this;
        vm.title = 'Food trucks';
        vm.google = {};
        vm.markers = [];
        function init(){
            uiGmapGoogleMapApi
                .then(function(){
                    dataService.getFoodTrucks().then(function(response){
                        vm.google = map.initMap(response.data);
                        vm.markers = markers.addMarkers(response.data);
                    });
                });
        }
        init();
    }
})();

/**
 * Created by Edward on 3/12/2016.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('map', function(){
            return {
                initMap: initMap
            };
            //function that sets map location
            function initMap(data){
                var location = setMapLocation(data);
                return {
                    map: {center: {latitude: location.latitude, longitude: location.longitude}, zoom: 15},
                    options: {
                        scrollwheel: true,
                        draggable: true,
                        streetView: false
                    }
                };
            }
            //function that gets the first data location and returns it
            function setMapLocation(data){
                if (arguments.length < 1){
                    return {
                        error: true,
                        message: 'Error: no data passed to function SetMapLocation'
                    };
                }
                if(data.length < 1){
                    return {
                        error: true,
                        message: 'Error: data passed into function SetMapLocation did not contain any data'
                    };
                } else {
                    //loop over data to find map local and set the local to the first location object that is not equal to undefined
                    for(var i = 0; i < data.length; i++){
                        if(data[i].location !== undefined){
                            return {
                                latitude: data[i].latitude,
                                longitude: data[i].longitude
                            };
                        }
                    }
                }

            }
        });
})();


/**
 * Created by Edward on 3/12/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .factory('markers', function(){
            //create a service to return functions
            return {
                addMarkers: addMarkers
            };
            //create a markers array
            function addMarkers(data){
                var markers = [];
                for(var i = 0; i < data.length; i++){
                    if(data[i].location != undefined && data[i].objectid != undefined){
                        var markerObject = {
                            id: data[i].objectid,
                            latitude: data[i].location.latitude,
                            longitude: data[i].location.longitude,
                            title: data[i].applicant
                        };
                        markers.push(markerObject)
                    }
                }
                return markers;
            }
        });
})();
/**
 * Created by Edward on 3/3/2016.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http){
        return {
            getFoodTrucks: getFoodTrucks
        };
        function getFoodTrucks(){
            return $http.get('https://data.sfgov.org/resource/rqzj-sfat.json')
                .success(function(data){
                    return data;
                })
                .error(function(err){
                    return err;
                })
        }
    }
})();
