/**
 * Created by Edward on 3/13/2016.
 */
'use strict';
(function(){
    describe('Data service', function(){
        var dataService;

        beforeEach(angular.mock.module('app'));

        beforeEach(angular.mock.inject(function (_dataService_) {
            dataService = _dataService_;
        }));

        describe('getFoodTrucks function', function () {
            it('should return a data object', function(done){
               dataService.getFoodTrucks().then(function (data) {
                   expect(data).toBeTruthy();
                   done();
               });
            });
        })
    });
})();
