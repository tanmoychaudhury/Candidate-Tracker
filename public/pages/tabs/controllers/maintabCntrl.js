'use strict'
billapp.controller('maintabController', function($scope, $state, $modal) {
	console.log('Main tab controller called');
	$scope.items = [" Banking"," Third Party Banking", " Ground Staff", " Cabin Crew", " Cargo", " Retail"];
	$scope.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DOC"];

	$scope.smssent = [
		{ "name": "YES" },
		{ "name": "NO" }
	];
	
	$scope.about = function () {
		console.log('opening pop up');
		var modalInstance = $modal.open({
			templateUrl: './pages/about/templates/abouttab.htm',
			controller: 'abouttabController',
		});
	}
	
	$scope.logoutBtnClick = function(){
		console.log('Logout button clicked');
		$state.go('login');
	}

	$scope.ShowId = function(tabIndex){
		$scope.tabId = tabIndex;
	};
});