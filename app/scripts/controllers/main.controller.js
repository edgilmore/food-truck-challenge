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
                        scrollwheel:false,
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