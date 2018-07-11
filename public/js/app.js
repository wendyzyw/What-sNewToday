'use strict'

angular.module('WhatNewToday', ['ngResource', 'ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			//route for home page
			.state('app', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'header.html'
					},
					'content': {
						templateUrl: 'calendar.html',
						controller : 'CalendarController'
					}
				}
			})
			//route from editList page to edit page
			.state('app.editList', {
				url: 'edit/:day',
				views: {
					'content@': {
						templateUrl: 'editList.html',
						controller : 'ListController'
					}
				}
			})
			
			.state('app.edit', {
				url: 'edit/:id',
				views: {
					'content@': {
						templateUrl: 'edit.html',
						controller : 'EditController'						
					}
				}
			})
			
			.state('app.newEdit', {
				url: 'edit',
				views: {
					'content@': {
						templateUrl: 'edit.html',
						controller : 'EditController'
					}
				}
			})
		
		$urlRouterProvider.otherwise('/');
	});