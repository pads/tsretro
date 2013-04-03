angular.module("tsretro", ["searchModule", "tiddlerModule", "statusModule"]);

angular.module("statusModule", ["ngResource"]).factory("statusService", function($resource) {

    var service = {};
    var Status = $resource("/status");

    service.getStatus = function(callback) {

        var status = Status.get(function() {

            callback(status);
        });
    };

    return service;
});