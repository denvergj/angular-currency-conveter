/**
*
* This service will return the currencies.
*
***/

var services = angular.module('ConverterApp.retrieveCurrencyService',[]);
services.factory('retrieveCurrencyService', ['$http', function retrieveCurrencyService($http) {
	var $apiUrl = 'api/currencies.json';
	return $http.get($apiUrl);
}]);