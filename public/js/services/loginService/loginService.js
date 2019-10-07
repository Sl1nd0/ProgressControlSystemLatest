app.service('loginService', function ($q, $http)
{
	let loginService = this

    loginService.loginAccount = function (data)
	{
		return $http.get('/API/loginAccount' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.loginAccount */ 

	loginService.Confirm = function (data)
	{
		return $http.get('/ConfirmAccount')
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* loginService.ConfirmAccount */
    
});