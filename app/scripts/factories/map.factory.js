/**
 * Created by Edward on 3/12/2016.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('map', function(){
            return {
                initMap: initMap
            };
            //function that sets map location
            function initMap(data){
                var location = setMapLocation(data);
                return {
                    map: {center: {latitude: location.latitude, longitude: location.longitude}, zoom: 15},
                    options: {
                        scrollwheel: true,
                        draggable: true,
                        streetView: false
                    }
                };
            }
            //function that gets the first data location and returns it
            function setMapLocation(data){
                if (arguments.length < 1){
                    return {
                        error: true,
                        message: 'Error: no data passed to function SetMapLocation'
                    };
                }
                if(data.length < 1){
                    return {
                        error: true,
                        message: 'Error: data passed into function SetMapLocation did not contain any data'
                    };
                } else {
                    //loop over data to find map local and set the local to the first location object that is not equal to undefined
                    for(var i = 0; i < data.length; i++){
                        if(data[i].location !== undefined){
                            return {
                                latitude: data[i].latitude,
                                longitude: data[i].longitude
                            };
                        }
                    }
                }

            }
        });
})();

