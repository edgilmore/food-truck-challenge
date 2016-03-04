/**
 * Created by Edward on 3/3/2016.
 */
(function(){
    angular.module('app').controller('mainController', mainController);

    mainController.$inject = ['dataService', '$window'];

    function mainController(dataService){
        var vm = this;
        vm.foodtrucks = [];
        vm.title = 'View the food trucks';

        function init(){
            dataService.getFoodTrucks()
                .then(function (response) {
                    if(response.error){
                        alert(error.message);
                    }
                    else{
                        vm.foodtrucks = response.data;
                    }
                })
        }
        init();
    }
})();