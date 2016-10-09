/**
*
* This controller will manage the main functionality of the ConverterApp.
*
***/

var converterController = angular.module("ConverterApp.converterController",[]);
converterController.controller("CalculatorController", ['$scope', '$http', '$filter', '$window', 'retrieveCurrencyService',function ($scope, $http, $filter, $window, retrieveCurrencyService) {
	
	// Set Defaults
	var digitLimit;
	var ratio;
	var convertFromNumber = [5,0,0];
	var convertFromTotal;
	
	// Handle the off-canvas menu logic.
	$scope.menuCheck = "closed";
	$scope.changeClass = function(){
		$scope.menuCheck = $scope.menuCheck === "closed" ? "open is-active" : "closed";
	};
	
	// Handle the closing of the mobile menu when the browser is resized beyond mobile widths.
	angular.element($window).bind('resize', function () {
	   if($window.innerWidth > 767) {
		   $scope.$apply(function() {
		       $scope.menuCheck = "closed";
		    });
	   };
	});
	
	// Call the service for the currencies.
	retrieveCurrencyService.success(function(data){
		// Grab the returned data.  
        var currenciesObject = data; 
        
        // Add the returned data to the scope
        $scope.currencyInfo = currenciesObject;
        
        // Initialize the first currency data.
        $scope.setCurrency(currenciesObject[0]);
	}).error(function(data,err){
	    console.error(err);
	});
	
	// Generate the calculator buttons.
	var numberRange = [];
	for(i = 1; i < 10; i++) {
		numberRange.push(i);
	}
	// Add on the extra characters / number.
	numberRange.push('.',0,'<');
	$scope.numberRange = numberRange;
	
	// Number addition Functionality
	$scope.updateOutput = function(character){
		
		// Check if the delete key button was clicked.
		if(character === '<') {
			convertFromNumber.pop();
		} else {
			
			// Find the decimal and set the digit limit.
			var decimalLocation = convertFromNumber.indexOf('.');
			digitLimit = decimalLocation !== -1 ? 6 : 5; 
			 
			// Prevent multiple decimal points.
			if(digitLimit === 6 && character === '.')
				return false;
			
			// Add the character to the numbers array.
			convertFromNumber.length < digitLimit ? convertFromNumber.push(character) : false;
		
		}
		
		// Perform the calculation.
		convertFromTotal = $scope.theCalculation(convertFromNumber);
		// Add a class so that we can manage the font-size based on how many digits there
		$scope.numberLength = "digits-"+$scope.converted_total.length;
	};
	
	// This method will set the currency
	$scope.setCurrency = function(currency){
		
		// Grab the ration from the JSON response and parseFloat it.
		ratio = parseFloat(currency.ratio);
		
		// Define the data from the JSON response into the relevant $scope variables.
		$scope.from_icon = currency.from_icon;
		$scope.from_label = currency.from_label;
		$scope.to_icon = currency.to_icon;
		$scope.to_label = currency.to_label;
		
		convertFromTotal = $scope.theCalculation(convertFromNumber);
	};
	
	// This method will do the calculation.
	$scope.theCalculation = function(){
		
		convertFromTotal = parseFloat(convertFromNumber.join(""));
		
		$scope.count = convertFromNumber.join("");
			
		$scope.converted_total = parseFloat(convertFromTotal * ratio).toFixed(2);
		
	};
	
}]);