'use strict'

angular.module('WhatNewToday')
	.controller('CalendarController', ['$scope', '$filter', '$state', function($scope, $filter, $state){
		var d = new Date();
		$scope.weekDay = d.getDay();
		$scope.thisMonth = d.getMonth();
		$scope.thisYear = $filter('date')(new Date(), 'yyyy');	
		$scope.thisDay = $filter('date')(new Date(), 'dd');
		$scope.monthName = '';
		$scope.monthDays = 0;
		//-2 get last two elements from sequence
		$scope.checkList = function(dayNum){
            $scope.isoDate = $scope.thisYear+("0" + ($scope.thisMonth + 1)).slice(-2)+dayNum;
			$state.go('app.editList',{'date': $scope.isoDate});
		}
		
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

    /***************************************************************/
	.controller('EditController', ['$scope','$window','$stateParams','editFactory',  function($scope, $window, $stateParams, editFactory){
		console.log($stateParams);
		if (!$stateParams.hasOwnProperty('id')){
			$scope.edit = {title:"", description:"", picFile:"", date:null};
		} else {
			$scope.edit = editFactory.getEdit().get({id:$stateParams.id}).$promise.then(
				function(response){
					$scope.edit = response;
					console.log(response);
				},
				function(response){
					console.error(response);
				}
			);
		}

		//return to list page for cancel button
		$scope.cancelEdit = function(){
			console.log($stateParams.date);
            $window.location.href = '/#/edit?date='+$stateParams.date;
		}

		//if its new edit: pass in 1
		//if its update edit: pass in 0
		$scope.submitEdit = function(){
			//check if this edit exists or not (if id is not passed into stateparams)
			if (!$stateParams.hasOwnProperty('id')) {
				//timestamp the date to it 
				$scope.edit.date = $stateParams.date;
				editFactory.getEdit().save($scope.edit).$promise.then(
					function(response){
						console.log(response);
					},
					function(response){
						console.log("error");
						console.log("Error: "+response.status + " " + response.statusText);
					}
				);
			} else {
				editFactory.getEdit().update({id:$stateParams.id}, $scope.edit).$promise.then(
					function(response){
						console.log("PUT done");
					},
					function(response){
						console.error(response);
					}
				);
			}
			$scope.editForm.$setPristine();
			$scope.edit = {title:"", description:"", picFile:"", date:null};
            $window.location.href = '/#/edit?date='+$stateParams.date;
		};
	}])

	/***************************************************************/
	.controller('ListController', ['$scope', 'editFactory', '$state', '$stateParams', function($scope, editFactory, $state, $stateParams){
		$scope.thisDate = $stateParams.date;
		$scope.allEdits = editFactory.getEdit().query(
			{'date': $stateParams.date},
			function(response){
				$scope.allEdits = response;
			},
			function(response){
				alert(response.status + " " + response.statusText);
			}
		);

		$scope.allTags = editFactory.getTag().query(
            function(response){
                $scope.allTags = response;
            },
            function(response){
                alert(response.status + " " + response.statusText);
            }
		)
				
		$scope.deleteEdit = function(thisId) {
            editFactory.getEdit().delete({id: thisId}, function (response) {
                console.log("DELETE done");

                //reload the page after success
                $state.reload();
            });
        }
		
	}]);