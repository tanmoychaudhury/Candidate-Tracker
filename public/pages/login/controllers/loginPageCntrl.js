'use strict'
billapp.controller('loginPageController', function($scope, $http, $state) {
	
	$scope.loginBtnclicked = function(){
		console.log('on Login btn click');
		if($scope.usernameModel == 'admin' && $scope.passwordModel == 'welcome'){
			console.log('success');
			$state.go('maintab.all');
		}else{
			console.log('err');
			swal({
				   title: "Wrong Username or Password",
				   type: "error" });
		}
	}
	
});
