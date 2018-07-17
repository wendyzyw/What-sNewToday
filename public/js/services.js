'use strict'

angular.module('WhatNewToday')
	.constant("baseURL","http://localhost:3000/")
	
	.service('editFactory', ['$resource', 'baseURL', function($resource, baseURL){
		this.getEdit = function(){
			return $resource(baseURL+"edit/:id",null, {
				'update':{method:'PUT'},
				'delete':{method:'DELETE'}
			});
		};

		this.getTag = function(){
			return $resource(baseURL+"tag/:id", null, {
                'update':{method:'PUT'},
                'delete':{method:'DELETE'}
			});
		}
	}]);