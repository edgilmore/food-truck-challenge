/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    'use strict';
    angular.module('app', ['ngRoute', 'uiGmapgoogle-maps']);
    angular.module('app')
        .config(function($routeProvider, uiGmapGoogleMapApiProvider){
            uiGmapGoogleMapApiProvider.configure({
                v: '3.2.0',
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


/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['dataService', 'uiGmapGoogleMapApi'];

    function mainController(dataService, uiGmapGoogleMapApi){
        var vm = this;
        vm.foodtrucks = [];
        vm.title = 'Food trucks';
        vm.markers = [];

        function init(){
            dataService.getFoodTrucks()
                .then(function (response) {
                    if(response.error){
                        alert(error.message);
                    }
                    else{
                        vm.foodtrucks = response.data;
                    }
                });
            uiGmapGoogleMapApi
                .then(function(maps){
                    vm.map = { center: {latitude: vm.foodtrucks[1].latitude, longitude: vm.foodtrucks[1].longitude }, zoom: 15}
                    vm.options = {
                        scrollwheel:true,
                        draggable: true
                    };
                    for(var i = 0; i < vm.foodtrucks.length; i++){
                        if(vm.foodtrucks[i].location != undefined && vm.foodtrucks[i].objectid != undefined){
                            var markerObject = {
                                id: vm.foodtrucks[i].objectid,
                                latitude: vm.foodtrucks[i].location.latitude,
                                longitude: vm.foodtrucks[i].location.longitude,
                                title: vm.foodtrucks[i].applicant
                            };
                            vm.markers.push(markerObject)
                        }
                    }
                });
        }
        init();
    }
})();
/**
 * Created by Edward on 3/3/2016.
 */
(function () {
    'use strict';
    angular.module('app').factory('dataService', dataService);

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
