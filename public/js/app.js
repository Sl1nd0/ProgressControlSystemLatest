var app = angular.module('progressApp', ['ngRoute', 'ngStorage', 'btford.socket-io'])


app.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/login/login.html',
        controller: 'loginController'
    })
    .when('/create', {
        templateUrl: '/create/create.html',
        controller: 'createController'
    })
    .when('/confirm', {
        templateUrl: '/confirm/confirm.html',
        controller: 'confirmController'
    })
    .when('/activate', {
        templateUrl: '/confirm/confirm.html',
        controller: 'activateController'
    })
    .when('/employees', {
        templateUrl: '/users/users1.html',
        controller: 'usersController'
    })
    .when('/huddles', {
        templateUrl: '/huddles/huddles.html',
        controller: 'huddleController'
    })
    .when('/leave', {
        templateUrl: '/leave/requestleave.html',
        controller: 'leaveController'
    })
    .when('/sendemail', {
        templateUrl: '/users/sendemail/sendemail.html',
        controller: 'emailController'
    })
    .when('/sendsms', {
        templateUrl: '/users/sendsms/sendsms.html',
        controller: 'smsController'
    })
    .when('/forgot', {
        templateUrl: '/forgotpassword/forgot.html',
        controller: 'forgotController'
    })
    .when('/approve', {
        templateUrl: '/leaveRequest/leaveReq.html',
        controller: 'leaveApproveController'
    })
    .when('/leavetable', {
        templateUrl: '/leaveTable/leaveTable.html',
        controller: 'leaveTableController'
    })
    .when('/location', {
        templateUrl: '/location/mylocation/location.html',
        controller: 'locationController'
    })
    .when('/addsite', {
        templateUrl: '/location/add site/addsite.html',
        controller: 'siteController'
    })
    .when('/hardware', {
        templateUrl: '/hardware/hardware.html',
        controller: 'automationController'
    })
    .otherwise({
        //redirectTo: '/'
         redirectTo: '/'
    })

});