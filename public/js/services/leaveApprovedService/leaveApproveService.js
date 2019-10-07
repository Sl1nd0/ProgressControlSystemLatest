app.service('leaveApprovedService', function ($q, $http)
{
	let leaveApprovedService = this

    usersService.getAll = function (data)
	{
		return $http.get('/API/TestAfta')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.loginAccount */ 
	
    usersService.SetSmsSession = function (data)
	{
		return $http.get('/API/GetSMSDet' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.smsSession */ 

    usersService.SetemailSession = function (data)
	{
		return $http.get('/API/GetEmailDet' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.emailSession */ 

	usersService.getLoggedIN = function ()
	{
		return $http.get('/getLoggedIn')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.smsSession */ 

});