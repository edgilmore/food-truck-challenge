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