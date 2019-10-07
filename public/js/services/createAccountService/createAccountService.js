app.service('createAccountService', function ($q, $http)
{
	let postGoalService = this

	postGoalService.createAccount = function (data)
	{
		return $http.get('/API/CreateAccount' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* createAccountService.createAccount */ 

	postGoalService.Confirm = function (data)
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
	} /* createAccountService.createAccount */
	
	postGoalService.Activate = function (data)
	{
		return $http.get('/API/ActivateAccount' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* createAccountService.createAccount */
	
	postGoalService.forgotPassword = function (data)
	{
		return $http.get('/API/forgotPassword' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* createAccountService.createAccount */
	
	postGoalService.resendVerification = function (data)
	{
		return $http.get('/API/resendCode' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* createAccountService.createAccount */
	

});