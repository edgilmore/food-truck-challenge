/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    'use strict';
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
