'use strict'

angular.module('WhatNewToday')
	.controller('CalendarController', ['$scope', '$filter', function($scope, $filter){
		var d = new Date();
		$scope.weekDay = d.getDay();
		$scope.thisMonth = d.getMonth();
		$scope.thisYear = $filter('date')(new Date(), 'yyyy');	
		$scope.thisDay = $filter('date')(new Date(), 'dd');
		$scope.monthName = '';
		$scope.monthDays = 0;
		
		switch ($scope.thisMonth) {
			case 0 : $scope.monthDays = 31; $scope.monthName = "January"; break;
			case 1 : $scope.monthDays = 28; $scope.monthName = "Feburary"; break;
			case 2 : $scope.monthDays = 31; $scope.monthName = "March"; break;
			case 3 : $scope.monthDays = 30; $scope.monthName = "Aprial"; break;
			case 4 : $scope.monthDays = 31; $scope.monthName = "May"; break;
			case 5 : $scope.monthDays = 30; $scope.monthName = "June"; break;
			case 6 : $scope.monthDays = 31; $scope.monthName = "July"; break;
			case 7 : $scope.monthDays = 31; $scope.monthName = "August"; break;
			case 8 : $scope.monthDays = 30; $scope.monthName = "September"; break;
			case 9 : $scope.monthDays = 31; $scope.monthName = "October"; break;
			case 10 : $scope.monthDays = 30; $scope.monthName = "November"; break;
			case 11 : $scope.monthDays = 31; $scope.monthName = "December"; break;
		}
		$scope.daysArr = Array($scope.monthDays).fill(0);
		var i = 0;
		for (i=0; i<$scope.monthDays; i++){
			$scope.daysArr[i] = i+1;
		}
		
		//calculate number of blanks before 1st day based on current day 
		var x = ($scope.thisDay - 1) % 7;
		var y = $scope.weekDay - x;
		$scope.blank = y>0 ? y : y+7;
		
		$scope.isSunday = function(){
			return ($scope.blank === 0);
		}
		
		$scope.blankArr = $scope.blank>0 ? Array($scope.blank).fill(0) : [];
		for (i=0; i<$scope.blank; i++){
			$scope.blankArr[i] = i+1;
		}
	}])
	
	.controller('EditController', ['$scope','editFactory', function($scope, editFactory){
		$scope.edit = {title:"", description:""};
		
		$scope.submitEdit = function(){
			if ($scope.edit){
				editFactory.getEdit().save($scope.edit).$promise.then(
					function(response){
						alert(response);
					},
					function(response){
						alert("error");
						console.log("Error: "+response.status + " " + response.statusText);
					}
				);
					
				$scope.editForm.$setPristine();
				$scope.edit = {title:"", description:""};
			}
		}
	}]);