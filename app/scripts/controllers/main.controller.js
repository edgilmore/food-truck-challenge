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
                });
        }
        init();
    }
})();