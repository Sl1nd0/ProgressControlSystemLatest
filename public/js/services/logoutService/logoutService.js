app.service('logoutService', function ($q, $http)
{
	let logoutService = this

    logoutService.logoutAccount = function ()
	{
		return $http.get('/API/logout')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* logoutService.loginAccount */ 
    
});