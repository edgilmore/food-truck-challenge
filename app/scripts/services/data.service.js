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
