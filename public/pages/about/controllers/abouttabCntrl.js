'use strict'; 
billapp.controller('abouttabController', ['$scope','$modalInstance', function ($scope, $modalInstance) {
	
	console.log('On abouttabController');
	
	$scope.close = function () {
		$modalInstance.dismiss('cancel');
	};
	
}]);