var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('UserFactory', function ($resource) {
    return $resource('http://localhost:8089/WebFuelServices/api/utils/listAllEstados', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: true
        }
    })
});
