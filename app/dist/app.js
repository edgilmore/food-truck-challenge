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
