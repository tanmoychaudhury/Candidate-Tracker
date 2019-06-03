'use strict'
billapp.controller('registertabController', function($scope,$http) {

	console.log('On registertabController');
	
	$("#menu_all").attr("class","");
	$("#menu_enrolled").attr("class","");
	$("#menu_billentry").attr("class","active");
	
	var candidatedetailsURLPOST = "/api/v1/record/add";
	function recordSubmit(){
		
		console.log('submit button clicked');
		$scope.due = $scope.fees - $scope.paid;
		
		var candidatedetailsJSON = {
				"NAME": $scope.name?$scope.name:null,
				"AGE": $scope.age?$scope.age:null,
				"CONTACT_NUMBER": $scope.connum?$scope.connum:null,
				"ALT_NUMBER": $scope.altnum?$scope.altnum:null,
				"ADDRESS": $scope.address?$scope.address:null,
				"QUALIFICATION": $scope.qualification?$scope.qualification:null,
				"WORK_EXP": $scope.workexp?$scope.workexp:null,
				"MONTH": $scope.month?$scope.month:null,
				"POST": $scope.selected?$scope.selected.toString():null,
				"INTERVIEW_DATE": $scope.interview_date?$scope.interview_date:null,
				"DOC_DATE": $scope.doc_date?$scope.doc_date:null,
				"FEES": $scope.fees?$scope.fees:0,
				"PAID": $scope.paid?$scope.paid:0,
				"DUE": $scope.due?$scope.due:0,
				"FEEDBACK": $scope.feedback?$scope.feedback:null,
				"SMS": "NO",
  				"DELETED_DATE": null
		}
		
		var postFunction = $http({
			    url: candidatedetailsURLPOST,
			    dataType:"json",
			    crossDomain: true,
			    header : {"Access-Control-Allow-Headers " : "Content-Type "},
			    header : {"X-Requested-With ": "Content-Type" },
			    data: candidatedetailsJSON,
			    method: "POST"
			 })
			.success(function(response) {//success handling
					console.log('Success response recieved '+ JSON.stringify(response));
					
					if(response.status == "500"){
						console.log('success if');
						swal({
							   title: response.message,
							   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
							swal({
								   title: response.message,
								   type: "success" });	
						}	
						else if(response.status == "422"){
							swal({
								   title: response.message,
								   type: "warning" });
						}	
						
						$scope.recordReset();
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: response.message,
						   type: "error" });
				});
	}
	$scope.recordSubmit = recordSubmit;
	
	function recordReset(){
		console.log('reset button clicked');
		//$scope.toggleAll();
		if ($scope.selected.length === 0 || $scope.selected.length > 0) {
			$scope.selected = [];
		}
		$scope.name = '';
		$scope.age = '';
		$scope.connum = '';
		$scope.altnum = '';
		$scope.address = '';
		$scope.qualification = '';
		$scope.workexp = '';
		$scope.month = '';
		$scope.interview_date = '';
		$scope.doc_date = '';
		$scope.fees = '';
		$scope.paid = '';
		$scope.due = '';
		$scope.feedback = '';
	}
	$scope.recordReset = recordReset;

	/* checkbox functions */
	$scope.selected = [];
	$scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
		list.splice(idx, 1);
		}
		else {
		list.push(item);
		}
		console.log('list = '+list);
		console.log('selected[] = '+$scope.selected);
	};

	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};

	$scope.isIndeterminate = function() {
		return ($scope.selected.length !== 0 &&
			$scope.selected.length !== $scope.items.length);
	};

	$scope.isChecked = function() {
		return $scope.selected.length === $scope.items.length;
	};

	$scope.toggleAll = function() {
		if ($scope.selected.length === $scope.items.length) {
		$scope.selected = [];
		} else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
		$scope.selected = $scope.items.slice(0);
		}
		console.log('selected[] = '+$scope.selected);
	};

});