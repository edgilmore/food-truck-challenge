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
            uiGmapGoogleMapApi
                .then(function(maps){
                    mapInit(vm.foodtrucks)
                });
        }
        function mapInit(foodtrucks){
            if(foodtrucks.length < 1 ){
                dataService.getFoodTrucks().then(function(response){
                    vm.foodtrucks = response.data;
                    mapInit(vm.foodtrucks);
                })
            }
            if(foodtrucks.length > 0){
                function mapLocation(){
                    for(var i = 0; i < foodtrucks.length; i++){
                        if(foodtrucks[i].location !== undefined){
                            return {
                                latitude: foodtrucks[i].latitude,
                                longitude: foodtrucks[i].longitude
                            }
                        }
                    }
                }
                var cityMap = mapLocation();
                vm.map = { center: {latitude: cityMap.latitude, longitude: cityMap.longitude }, zoom: 15};
                vm.options = {
                    scrollwheel:true,
                    draggable: true
                };
                for(var i = 0; i < foodtrucks.length; i++){
                    if(foodtrucks[i].location != undefined && foodtrucks[i].objectid != undefined){
                        var markerObject = {
                            id: foodtrucks[i].objectid,
                            latitude: foodtrucks[i].location.latitude,
                            longitude: foodtrucks[i].location.longitude,
                            title: foodtrucks[i].applicant
                        };
                        vm.markers.push(markerObject)
                    }
                }
            }
        }
        init();
    }
})();