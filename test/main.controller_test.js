/**
 * Created by Edward on 3/13/2016.
 */
(function(){
    'use strict';
    describe('Unit Test: controllers', function () {
        'use strict';
        var scope, $location, createController;

        beforeEach(inject(function ($rootScope, $controller, _$location_) {
            $location = _$location_;
            scope = $rootScope.$new();

            createController = function() {
                return $controller('MainController', {
                    '$scope': scope
                });
            };
        }));

        describe('home', function() {
            it('should navigate to home', function () {
                var controller = createController();
                $location.path('/');
                expect($location.path()).toBe('/');
            });
        });
    });
})();
