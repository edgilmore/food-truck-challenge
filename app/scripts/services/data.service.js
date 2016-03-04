/**
 * Created by Edward on 3/3/2016.
 */
(function () {
    'use strict';
    angular.module('foodTruckApp').service('DataService',dataService);
    function dataService(){
        function getFoodTruckData(){
            return $http.get()
                .then(function(data){
                    return data;
                });
        }
        return {
            getFoodTruckLocations: getFoodTruckData
        }
    }
})();
