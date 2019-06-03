'use strict'
billapp.controller('dashboardtabController', function($scope,$http) {

	console.log('On dashboardtabController');
	
	if($scope.tabId === 1){
		$("#menu_all").attr("class","active");
		$("#menu_enrolled").attr("class","");
		$("#menu_billentry").attr("class","");
	}else if($scope.tabId === 2){
		$("#menu_all").attr("class","");
		$("#menu_enrolled").attr("class","active");
		$("#menu_billentry").attr("class","");
	}
	
	
	/* sort feature */
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverseSort = !$scope.reverseSort; //if true make it false and vice versa
    }
	
	var candidatedetailsURLGET = "/api/v1/record/show/all";
	var enrolledcandidatedetailsURLGET = "/api/v1/record/show/enrolled";
	/* http get call */
	$http({
		url: candidatedetailsURLGET,
		method: "GET"
	}).success(function(response) {
			//console.log('List of candidate details - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
			$scope.candidate  = response;
	});

	$http({
		url: enrolledcandidatedetailsURLGET,
		method: "GET"
	}).success(function(response) {
			//console.log('List of candidate details - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
			$scope.enrolledcandidate  = response;
	});
		/* delete data */
		 $scope.remove = function (data,index) {
			var candidatedeleteURLPUT = "/api/v1/record/update/"+data._id;
			$scope.dt = new Date();

			var candidatedeleteJSON = {
				"DELETED_DATE": $scope.dt
			}
			
			var postFunction = $http({
					url: candidatedeleteURLPUT,
					dataType:"json",
					crossDomain: true,
					header : {"Access-Control-Allow-Headers " : "Content-Type "},
					header : {"X-Requested-With ": "Content-Type" },
					data: candidatedeleteJSON,
					method: "PUT"
				})
				.success(function(response) {//success handling
					//console.log('Success response recieved '+ JSON.stringify(response));
					
					if(response.status == "500"){
						//console.log('success if');
						swal({
							   title: "Please Try Again",
							   text: "Internal Server Error",
							   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
							swal({
								   title: "Success",
								   text: "Candidate details deleted successfully",
								   type: "success" });
							/* http get call */
							$http({
								url: candidatedetailsURLGET,
								method: "GET"
							}).success(function(response) {
									$scope.candidate  = response;
							});
							$http({
								url: enrolledcandidatedetailsURLGET,
								method: "GET"
							}).success(function(response) {
									$scope.enrolledcandidate  = response;
							});	
						}	
						else if(response.status == "422"){
							swal({
								   title: "Please Try Again",
								   text: "Internal Server Error",
								   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					// console.log('err');
					// console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: "Internal Server Error",
						   type: "error" });
				});
         };
		
		$scope.edited = -1;

        $scope.edit = function (index) {
            $scope.edited = index;
        };

		/* Save edited fields */
		function updateEdit(data,detailsupdate) {

			var candidateupdateURLPUT = "/api/v1/record/update/"+data._id;
			$scope.dueupdate = (detailsupdate.fees?detailsupdate.fees:data.FEES) - (detailsupdate.paid?detailsupdate.paid:data.PAID);
			console.log('update due = '+$scope.dueupdate);

			var candidateupdateJSON = {
				"NAME": detailsupdate.name,
				"AGE": detailsupdate.age,
				"CONTACT_NUMBER": detailsupdate.connum,
				"ALT_NUMBER": detailsupdate.altnum,
				"ADDRESS": detailsupdate.address,
				"QUALIFICATION": detailsupdate.qualification,
				"WORK_EXP": detailsupdate.workexp,
				"MONTH": detailsupdate.month,
				//"POST": detailsupdate.,
				"INTERVIEW_DATE": detailsupdate.interview_date,
				"FEES": detailsupdate.fees,
				"PAID": detailsupdate.paid,
				"DOC_DATE": detailsupdate.doc_date,
				"DUE": $scope.dueupdate,
				"FEEDBACK": detailsupdate.feedback,
				"SMS": detailsupdate.sms.name
			}

		var postFunction = $http({
			    url: candidateupdateURLPUT,
			    dataType:"json",
			    crossDomain: true,
			    header : {"Access-Control-Allow-Headers " : "Content-Type "},
			    header : {"X-Requested-With ": "Content-Type" },
			    data: candidateupdateJSON,
			    method: "PUT"
			 })
			.success(function(response) {//success handling
					//console.log('Success response recieved '+ JSON.stringify(response));
					
					if(response.status == "500"){
						//console.log('success if');
						swal({
							   title: response.message,
							   type: "error" });					
					}else{
						//console.log('success else');
						
						if(response.status == "200"){
							swal({
								   title: response.message,
								   type: "success" });
							/* http get call */
							$http({
								url: candidatedetailsURLGET,
								method: "GET"
							}).success(function(response) {
									//console.log('List of candidate - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
									$scope.candidate  = response;
							});
							$http({
								url: enrolledcandidatedetailsURLGET,
								method: "GET"
							}).success(function(response) {
									$scope.enrolledcandidate  = response;
							});	
						}	
						else if(response.status == "422"){
							swal({
								   title: response.message,
								   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					//console.log('err');
					//console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: response.message,
						   type: "error" });
				});
            $scope.edited = -1;

        };
		$scope.updateEdit = updateEdit;

		$scope.close = function () {
			$scope.edited = -1;
			//$window.location.reload();
			$http({
				url: candidatedetailsURLGET,
				method: "GET"
			}).success(function(response) {
				$scope.candidate  = response;
			});
			$http({
				url: enrolledcandidatedetailsURLGET,
				method: "GET"
			}).success(function(response) {
				$scope.enrolledcandidate  = response;
			});
		};
});