app.controller('logoutController', function ($scope, $rootScope, $window, $sessionStorage, $localStorage, $location,  $http, chatSocket, logoutService) {

	alert('Hi Mr Logout!!');
	
	//Logging out
	logoutService.logoutAccount()
	.then(function (response)
	{
		//alert(response.data);
		$location.path('/');
	})
	
});     